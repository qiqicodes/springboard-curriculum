"""Demo Flask application."""

from flask import Flask, request
from random import choice, randint


app = Flask(__name__)


@app.route('/')
def index():
    """Show homepage"""

    return """
      <html>
        <body>
          <h1>I am the landing page</h1>
        </body>
      </html>
      """

@app.route('/hello')
def say_hello():
    """Return simple "Hello" Greeting."""

    html = "<html><body><h1>Hello</h1></body></html>"
    return html


@app.route("/search")
def search():
    """Handle GET requests like /search?term=fun"""

    term = request.args["term"]
    return f"<h1>Searching for {term}</h1>"


@app.route("/add-comment")
def add_comment_form():
    """Show form for adding a comment."""

    return """
      <form method="POST">
        <input name="comment">
        <button>Submit</button>
      </form>
      """

@app.route("/add-comment", methods=["POST"])
def add_comment():
    """Handle adding comment."""

    comment = request.form["comment"]

    # TODO: save that into a database!

    return f'<h1>Received "{comment}".</h1>'
      

USERS = {
  "whiskey": "Whiskey The Dog",
  "spike": "Spike The Porcupine",
}  

@app.route('/user/<username>')
def show_user_profile(username):
    """Show user profile for user."""

    name = USERS[username]
    return f"<h1>Profile for {name}</h1>"


POSTS = {
  1: "Flask is pretty cool",
  2: "Python is neat-o"
}

@app.route('/post/<int:post_id>')
def show_post(post_id):
    """Show post with given integer id."""

    print("post_id is a ", type(post_id))

    post = POSTS[post_id]

    return f"<h1>Post #{post_id}</h1><p>{post}</p>"


@app.route("/shop/<toy>")
def toy_detail(toy):
    """Show detail about a toy."""

    # Get color from req.args, falling back to None
    color = request.args.get("color")

    return f"<h1>{toy}</h1>Color: {color}"
