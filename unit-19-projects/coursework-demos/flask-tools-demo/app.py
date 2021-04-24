from flask import Flask, request, render_template, redirect, flash, jsonify

from flask_debugtoolbar import DebugToolbarExtension

COMPLIMENTS = ["cool", "clever", "tenacious", "awesome", "Pythonic"]

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"

debug = DebugToolbarExtension(app)

POSTS = {
    1: "What a nice post!",
    2: "An even nicer post!",
}


@app.route('/post/<post_id>')
def err_demo(post_id):
    """An example of a page that raises an error."""

    text = POSTS[post_id]

    return f"<html><body>{text}</body></html"


@app.route('/redirect-me')
def redirect_example():
    """Example redirect."""

    return redirect("/somewhere-else")


@app.route("/somewhere-else")
def somewhere_else():
    """Example route"""

    return "Yay! You got here!"


@app.route("/post-example")
def post_example_form():
    """Example of a post form."""

    return render_template("post-form.html")


@app.route("/post-example", methods=["POST"])
def post_example():
    """An example of good POST handling."""

    isbn = request.form["isbn"]

    print(f"\n\nBuying Book: {isbn}\n\n")

    # flash message: we'll talk about this soon
    # flash(f"Book {isbn} bought!")

    return redirect("/thanks")


@app.route("/thanks")
def say_thanks():
    """Thank user for buying a book."""

    return render_template("thanks.html")


@app.route("/example-json")
def example_json_route():
    """Return some JSON."""

    info = {"name": "Whiskey", "cute": "Hella"}
    return jsonify(info)

    # Alternate syntax
    # return jsonify(name="Whiskey", cute="Hella")
