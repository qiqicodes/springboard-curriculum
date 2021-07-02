import re
from flask import Flask, redirect, render_template, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from werkzeug.exceptions import Unauthorized

from models import db, connect_db, User, Feedback
from forms import SignUpForm, SignInForm, DeleteForm, FeedbackForm

app = Flask(__name__)
app.config['SECRET_KEY'] = 'OH-SO-SECRET'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///feedback_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

# In case need to turn of redirects:
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)


@app.route('/')
def home():
    '''Redirect to /register.'''

    return redirect('/register')


@app.route('/register', methods=['GET', 'POST'])
def signup():
    '''Show a form that when submitted will register/create a user.'''

    if 'username' in session:
        print(session['username'])
        return redirect(f"/users/{session['username']}")

    form = SignUpForm()

    if form.validate_on_submit(): #POST request
        username = form.username.data
        password = form.password.data
        email = form.email.data
        first_name = form.first_name.data
        last_name = form.last_name.data

        user = User.register(username, password, email, first_name, last_name)

        db.session.commit()

        session['username'] = user.username
        flash(f"Registered", 'success')
        return redirect(f"/users/{user.username}")
        
    else:
        return render_template('/users/signup.html', form=form)


@app.route('/login', methods=['GET','POST'])
def signin():
    '''Process the login form, ensuring the user is authenticated and going to user's profile if so.'''
     
    if 'username' in session:
        print(session['username'])
        return redirect(f"/users/{session['username']}")

    form = SignInForm()

    if form.validate_on_submit(): #POST request
        username = form.username.data
        password = form.password.data

        user = User.authenticate(username, password)

        if user:
            session['username'] = user.username
            flash(f"Welcome back {user.first_name}!", 'success')
            return redirect(f"/users/{user.username}")
        else:
            form.username.errors = ['Invalid username/password.']
            return render_template('/users/signin.html', form=form)
    
    return render_template('/users/signin.html', form=form)


@app.route('/logout')
def signout():
    '''Clear any information from the session and redirect to /'''

    session.pop('username')
    return redirect('/')

@app.route('/users/<username>')
def display_user_profile(username):
    '''Return user's profile'''
    
    if 'username' not in session or username != session['username']:
        flash('no username!', 'warning')
        raise Unauthorized()

    user = User.query.get(username)
    form = DeleteForm()

    return render_template("users/user_profile.html", user=user, form=form)


@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username):
    '''Remove the user from the database'''

    if 'username' not in session or username != session['username']:
        flash('no access allowed', 'warning')
        raise Unauthorized()

    user = User.query.get_or_404(username)

    db.session.delete(user)
    db.session.commit()
    session.pop('username')

    return redirect('/')
    
@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])    
def add_feedback(username):
    '''Display a form to add feedback Make sure that only the user who is logged in can see this form'''

    if "username" not in session or username != session['username']:
        raise Unauthorized()
 
    form = FeedbackForm()
    user = User.query.get_or_404(username)

    if form.validate_on_submit(): #POST request
        title = form.title.data
        content = form.content.data

        feedback = Feedback(title=title, content=content, username=username)

        db.session.add(feedback)
        db.session.commit()

        flash(f"Added Feedback!", 'success')
        return redirect(f"/users/{username}")
    else:
        return render_template('/feedback/add.html', form=form, user=user)


@app.route('/feedback/<int:feedback_id>/update', methods=['GET', 'POST'])
def update_feedback(feedback_id):
    '''Display a form to edit feedback — 
    **Make sure that only the user who has written that feedback can see this form **
    '''
    feedback = Feedback.query.get_or_404(feedback_id)

    if "username" not in session or feedback.username != session['username']:
        raise Unauthorized()

    form = FeedbackForm()

    if form.validate_on_submit(): #POST request
        feedback.title = form.title.data
        feedback.content = form.content.data

        db.session.commit()

        flash(f"Edited Feedback!", 'success')
        return redirect(f"/users/{feedback.username}")
    else:
        return render_template('/feedback/edit.html', form=form, feedback=feedback)


#TODO
@app.route('/feedback/<int:feedback_id>/delete', methods=['POST'])
def delete_feedback(feedback_id):
    '''Delete a specific piece of feedback and redirect to /users/<username> — 
    Make sure that only the user who has written that feedback can delete it
    '''

    feedback = Feedback.query.get_or_404(feedback_id)

    if 'username' not in session or feedback.user.username != session['username']:
        flash('no access allowed', 'warning')
        raise Unauthorized()

    form = DeleteForm()

    if form.validate_on_submit(): 
        db.session.delete(feedback)
        db.session.commit()
    
    flash(f"Deleted Feedback!", 'success')
    return redirect(f'/users/{feedback.user.username}')