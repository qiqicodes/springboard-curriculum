from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle

# Unittest cli cmd
# python -m unittest test.py
class FlaskTests(TestCase):

    def setUp(self):
        '''Set up before every test'''

        self.client = app.test_client()
        app.config['TEST'] = True

    def test_homepage(self):
        '''Test to make sure all html is displayed, all session information is in session'''

        with self.client:
            response = self.client.get('/')
            self.assertIn('board', session)
            self.assertIsNone(session.get('highscore'))
            self.assertIn(b'High Score:', response.data)
            self.assertIn(b'Score:', response.data)
            self.assertIn(b'Seconds Left:', response.data)

    def test_word_validity_with_modified_board(self):
        '''Test the whether the word is valid when board is modify'''


        with self.client as client:
            with client.session_transaction() as sess:
                sess['board'] = [["D", "I", "G", "Q", "Q"], 
                                 ["S", "A", "F", "Q", "Q"], 
                                 ["W", "A", "T", "Q", "Q"], 
                                 ["C", "A", "C", "Q", "Q"], 
                                 ["J", "I", "T", "Q", "Q"]]
        response = self.client.get('/validate-word?word=fact')
        self.assertEqual(response.json['result'], 'ok')

        
    def test_invalid_word(self):
        '''Test if the word is in the dictionary'''

        self.client.get('/')
        response = self.client.get('/validate-word?word=elephant')
        self.assertEqual(response.json['result'], 'not-on-board')


    def test_non_letter_input(self):
        '''Test if the word is on the board'''

        self.client.get('/')
        response = self.client.get('/validate-word?word=1238uasf')
        self.assertEqual(response.json['result'], "not-word")

