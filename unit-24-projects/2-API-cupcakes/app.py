"""Flask app for Cupcakes"""
from flask import Flask, request, render_template, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension

from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config['SECRET_KEY'] = 'oh-so-secret'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

# In case need to turn of redirects:
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

@app.route("/")
def home():
    '''Show homepage'''

    return render_template('/index.html')


@app.route('/api/cupcakes')
def api_get_cupcakes():
    '''Get data about all cupcakes
    
    Respond with JSON like: {cupcakes: [{id, flavor, size, rating, image}, ...]}.
    '''

    cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=cupcakes)


@app.route('/api/cupcakes/<int:cupcake_id>')
def api_get_single_cupcake(cupcake_id):
    '''Get data about a single cupcake.
    
    Respond with JSON like: {cupcake: {id, flavor, size, rating, image}}.
    '''

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    return jsonify(cupcake=cupcake.serialize())


@app.route('/api/cupcakes', methods=["POST"])
def create_cupcake():
    '''Create a cupcake with flavor, size, rating and image data from the body of the request.
    
    Respond with JSON like: {cupcake: {id, flavor, size, rating, image}}.
    '''

    data = request.json

    new_cupcake = Cupcake(
        flavor = data['flavor'],
        size = data['size'],
        rating = data['rating'],
        image_url = data['image_url'] or None
    )

    db.session.add(new_cupcake)
    db.session.commit()

    return (jsonify(new_cupcake=new_cupcake.serialize()), 201)

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['PATCH'])
def api_update_cupcake(cupcake_id):
    '''Update a cupcake with the id passed in the URL and flavor, 
    size, rating and image data from the body of the request. 
    You can always assume that the entire cupcake object will be passed to the backend.

    This should raise a 404 if the cupcake cannot be found.
    
    Respond with JSON of the newly-updated cupcake, like this: {cupcake: {id, flavor, size, rating, image}}.
    '''

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    data = request.json

    cupcake.flavor = data['flavor'],
    cupcake.size = data['size'],
    cupcake.rating = data['rating'],
    cupcake.image_url = data['image_url']

    db.session.add(cupcake)
    db.session.commit()

    return jsonify(cupcake.serialize())


@app.route('/api/cupcakes/<int:cupcake_id>', methods=["DELETE"])
def api_delete_cupcake(cupcake_id):
    '''This should raise a 404 if the cupcake cannot be found.

    Delete cupcake with the id passed in the URL. 
    Respond with JSON like {message: "Deleted"}.
    '''

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    db.session.delete(cupcake)
    db.session.commit()

    return jsonify(message = "Deleted")