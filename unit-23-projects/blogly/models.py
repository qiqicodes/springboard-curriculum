"""Models for Blogly."""

import datetime
from flask_sqlalchemy import SQLAlchemy

GENERIC_PHOTO = "https://www.hilomedicalcenter.org/wp-content/uploads/2019/01/persontwo.png"

db = SQLAlchemy()

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

class User(db.Model):
    '''Blog user'''

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.Text, nullable=False, default=GENERIC_PHOTO)
    
    @property
    def get_full_name(self):
        '''Returns the full name'''

        return self.first_name + ' ' + self.last_name

