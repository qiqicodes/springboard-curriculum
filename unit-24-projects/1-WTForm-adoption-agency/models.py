from flask_sqlalchemy import SQLAlchemy

GENERIC_PHOTO = "https://theshelterpetproject.org/wp-content/uploads/2019/02/image-grid-house.png"

db = SQLAlchemy()

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

class Pet(db.Model):
    '''Available Pet for adoption'''

    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    species = db.Column(db.Text, nullable=False)
    photo_url = db.Column(db.Text)
    age = db.Column(db.Integer)
    notes = db.Column(db.Text)
    available = db.Column(db.Boolean, nullable=False, default=True)
    
    def image_url(self):
        '''Returns an image for pet'''

        return self.photo_url or GENERIC_PHOTO



