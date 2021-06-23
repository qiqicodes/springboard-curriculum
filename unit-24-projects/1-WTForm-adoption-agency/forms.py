from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, TextAreaField, BooleanField

from wtforms.validators import InputRequired, Optional, URL, NumberRange

class AddPetForm(FlaskForm):
    '''Form for adding pet'''

    name = StringField('Pet Name', validators=[InputRequired()])
    species = SelectField('Species', choices=[("cat", "Cat"), ("dog" ,"Dog"), ("porcupine", "Porcupine")])
    photo_url = StringField('Photo URL', validators=[Optional(), URL()])
    age = IntegerField('Age', validators=[Optional(), NumberRange(min=0, max=30)])
    notes = TextAreaField('Comments', validators=[Optional(), NumberRange(min=3, max=300)])


class EditPetForm(FlaskForm):
    '''Form for editing an existing pet'''

    photo_url = StringField('Photo URL', validators=[Optional(), URL()])
    notes = TextAreaField('Comments', validators=[Optional()])
    available = BooleanField('Available')