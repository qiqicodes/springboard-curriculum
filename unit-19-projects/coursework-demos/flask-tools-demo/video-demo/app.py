from flask import Flask, request, render_template,  redirect, flash,  jsonify, session
from random import randint,  choice, sample
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

app.config['SECRET_KEY'] = "chickenzarecool21837"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

MOVIES = {'Amadeus', 'Chicken Run', 'Dances With Wolves'}


@app.route('/')
def home_page():
    """Shows home page"""
    session['fav_number'] = 42
    return render_template('home.html')


@app.route('/old-home-page')
def redirect_to_home():
    """Redirects to new home page"""
    flash('That page has moved!  This is our new home page!')
    return redirect("/")


@app.route('/movies')
def show_all_movies():
    """Show list of all movies in fake DB"""
    return render_template('movies.html', movies=MOVIES)


@app.route('/movies/json')
def get_movies_json():
    return jsonify(list(MOVIES))


@app.route('/movies/new', methods=["POST"])
def add_movie():
    title = request.form['title']
    # Add to pretend DB

    if title in MOVIES:
        flash('Movie Already Exists!', 'error')
    else:
        MOVIES.add(title)
        flash("Created Your Movie!", 'success')
    return redirect('/movies')
