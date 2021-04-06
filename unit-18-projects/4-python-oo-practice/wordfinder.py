"""Word Finder: finds random words from a dictionary."""

import random

class WordFinder:
    '''Find random word

    >>> wf = WordFinder("simple.txt")
    3 words read

    >>> wf.random() in ['cat', 'dog', 'porcupine']
    True

    >>> wf.random() in ['cat', 'dog', 'porcupine']
    True

    >>> wf.random() in ['cat', 'dog', 'porcupine']
    True

    >>> wf.random() in ['cat', 'dog', 'porcupine']
    True
    '''

    def __init__(self, filename):
        '''read dictionary and print number of words read'''

        self.filename = filename 
        with open(filename) as file:
            self.words = file.read().splitlines()
        print(f"{len(self.words)} words read")

    def parse(self, dictionary):
        '''return word without spaces'''
        for word in dictionary:
            return word.strip()

    def random(self):
        '''return random words'''
        return random.choice(self.words)


class SpecialWordFinder(WordFinder):
    '''Special WordFinder that excludes new lines and comments
    
    >>> compi  = SpecialWordFinder('complex.txt')
    8 words read

    >>> compi.random_parse() in ['pear', 'carrot', 'kale']
    True

    >>> compi.random_parse() in ['pear', 'carrot', 'kale']
    True

    >>> compi.random_parse() in ['pear', 'carrot', 'kale']
    True

    >>> dirty = SpecialWordFinder('dirty_word.txt')
    15 words read
    
    >>> dirty.random_parse() in ['monster', 'random', 'digital', 'firm', 'bless']
    True

    
    '''


    def random_parse(self):
        '''parse file into list of words, excludes new lines and comments'''
        word_list = list()
        for word in self.words:
            if word.strip() and not word.startswith("#"):
                word_list.append(word.strip())
                print(word_list)
        return random.choice(word_list)

