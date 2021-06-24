"""Blogly application."""

from flask import Flask, request, redirect, render_template, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension

from models import db, connect_db, User

app = Flask(__name__)
app.config['SECRET_KEY'] = 'OH-SO-SECRET'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

# In case need to turn of redirects:
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

@app.route('/')
def homepage():
    '''Homepage redirects to list of users'''
    
    return redirect('/users')

@app.route('/users')
def show_users():
    '''Show all users order by last name then first name'''

    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template('users/index.html', users=users)

@app.route('/users/new', methods=["GET"])
def show_add_user_form():
    '''Show add new user form'''

    return render_template('/users/new.html')

#TODO: fix session.commit
@app.route('/users/new', methods=["POST"])
def add_user():
    '''Add user to database'''

    # new_user = User(first_name=request.form['first_name'], last_name=request.form['last_name'], image_url=request.form['image_url'] or None)
    # import pdb; pdb.set_trace()
    
    new_user = User(
        first_name=request.form['first_name'],
        last_name=request.form['last_name'])

    db.session.add(new_user)
    db.session.commit()

    flash(f"Added {new_user.get_full_name}'s Profile")
    return redirect("/users")


@app.route('/users/<int:user_id>')
def show_selected_user(user_id):
    '''Show information about the given user'''

    user = User.query.get_or_404(user_id)
    return render_template('users/details.html', user=user)

@app.route('/users/<int:user_id>/edit')
def show_edit_user_form(user_id):
    '''Show edit form for existing user'''

    user = User.query.get_or_404(user_id)
    return render_template(f'users/edit.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=["POST"])
def update_user(user_id):
    '''Edit existing user'''

    user = User.query.get_or_404(user_id)
    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.image_url = request.form['image_url']

    db.session.add(user)
    db.session.commit()
    
    flash(f"updated {user.get_full_name}'s Profile")
    return redirect("/users")

@app.route('/users/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):
    '''Delete existing user from database'''

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()

    return redirect("/users")

@app.route('/api/users/<int:user_id>', methods=["GET"])
def api_get_user(user_id):
    '''Return user info in JSON'''

    user = User.query.get_or_404(user_id)
    info = {"first-name": user.first_name, "last-name": user.last_name, "image_url": user.image_url}

    return jsonify(info)