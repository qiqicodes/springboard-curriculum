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
    
    posts = db.relationship("Post", backref="user", cascade="all, delete-orphan")

    def __repr__(self):
        return f"<User ID: {self.id}, Name: {self.first_name} {self.last_name}>"

    @property
    def get_full_name(self):
        '''Returns the full name'''

        return f"{self.first_name} {self.last_name}"

           
class Post(db.Model):
    '''Blog post'''

    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f"<Post ID:{self.id}, Title: {self.title} {self.user_id}>"


    #TODO: FS2 prettify date time
    # Show Friendly Date
    # When listing the posts (on the post index page, the homepage, and the user detail page), 
    # show a friendly-looking version of the date, like “May 1, 2015, 10:30 AM”.
    @property
    def friendly_date(self):
        '''Returns human friendly date'''

        return self.created_at.strftime("%b %-d, %Y, %-I:%M %p")