from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, HiddenField
from wtforms.widgets import PasswordInput

from wtforms.validators import InputRequired, Email, Length

class SignUpForm(FlaskForm):
    '''Form for user sign up'''

    username = StringField('User Name', validators=[InputRequired(), Length(min=3, max=20)])
    password = StringField('Password',  validators=[InputRequired(), Length(min=8, max=50)])
    email = StringField('Email', validators=[InputRequired(), Email(), Length(max=50)])
    first_name = StringField('First Name', validators=[InputRequired(),Length(max=30)])
    last_name = StringField('Last Name', validators=[InputRequired(),Length(max=30)])

class SignInForm(FlaskForm):
    '''Form for user sign in'''

    username = StringField('User Name', validators=[InputRequired(), Length(min=3, max=20)])
    password = StringField('Password', widget=PasswordInput(), validators=[InputRequired(), Length(min=8, max=50)])

class FeedbackForm(FlaskForm):
    '''Form for adding/editing feedback'''
    title = TextAreaField('Title', validators=[InputRequired(), Length(max=150)])
    content = TextAreaField('Content', validators=[InputRequired()])
    
class DeleteForm(FlaskForm):
    '''Form for deleting form data'''


