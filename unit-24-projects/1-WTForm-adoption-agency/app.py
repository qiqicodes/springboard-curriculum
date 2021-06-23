from flask import Flask, render_template, redirect, url_for, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension

from models import db, connect_db, Pet

from forms import AddPetForm, EditPetForm

app = Flask(__name__)
app.config['SECRET_KEY'] = 'OH-SO-SECRET'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adoption_agency'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)

# In case need to turn of redirects:
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)


@app.route('/')
def homepage():
    '''List all pets'''

    pets = Pet.query.order_by(Pet.id).all()
    return render_template('homepage.html', pets=pets)

@app.route('/add', methods=['GET', 'POST'])
def add_pet():
    '''Add pet to database'''

    form = AddPetForm()
    

    if form.validate_on_submit(): #POST request
        
        kwargs = {k:v for k,v in form.data.items() if k != "csrf_token"}
        new_pet = Pet(**kwargs)
        
        #do something to db
        db.session.add(new_pet)
        db.session.commit()

        flash(f"{new_pet.name} added")
        return redirect(url_for("homepage"))

    else: #GET requests
        return render_template('add_pet_form.html', form=form)

@app.route('/<int:pet_id>', methods=['GET', 'POST'])
def edit_pet(pet_id):
    '''Edit existing pet and update database'''
    
    pet = Pet.query.get_or_404(pet_id)
    form = EditPetForm(obj=pet)

    if form.validate_on_submit(): #POST request
        #do something to form
        pet.notes = form.notes.data
        pet.available = form.available.data
        pet.photo_url = form.photo_url.data
        
        
        #do something to db
        db.session.commit()
      

        flash(f"Updated {pet.name}'s profile!")
        return redirect(url_for("homepage"))
    
    else: #GET requests
        return render_template('edit_pet_form.html', form=form, pet=pet)


@app.route('/api/pets/<int:pet_id>', methods=["GET"])
def api_get_pet(pet_id):
    '''Return pet info in JSON'''

    pet = Pet.query.get_or_404(pet_id)
    info = {"name": pet.name, "species": pet.species, "age": pet.age, "available": pet.available }

    return jsonify(info)