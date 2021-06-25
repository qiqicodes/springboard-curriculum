from unittest import TestCase

from app import app
from models import db, User, Post

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

db.drop_all()
db.create_all()

class UserModelTestCase(TestCase):
    '''Tests for User Model'''

    def setup(self):
        '''Clean up any existing users'''

        User.query.delete()

    def tearDown(self):
        '''Clean up any unallowed addition from stage'''

        db.session.rollback()

    def test_get_full_name(self):
        user = User(first_name='John', last_name='Williams')
        db.session.add(user)
        db.session.commit()

        user_full_name = User.query.get(1)
        self.assertEqual(user_full_name.get_full_name, 'John Williams')