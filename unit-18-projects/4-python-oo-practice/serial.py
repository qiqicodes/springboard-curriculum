"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start = 0):
        '''Create a Serial Generator with a starting value at start'''
        self.start = start
        self.next = start

    def generate(self):
        '''Return the next Serial number'''
        self.next += 1
        return self.next - 1

    def .reset(self):
        '''Reset number to starting value'''
        self.start = self.start
        