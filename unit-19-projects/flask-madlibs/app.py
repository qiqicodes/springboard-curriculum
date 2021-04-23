from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from stories import story

app = Flask(__name__)
app.config["SECRET_KEY"] = "fufu123"
debug = DebugToolbarExtension(app)

@app.route('/')
def prompt():
    """Show form with prompts and generate story"""
    
    prompts = story.prompts
    return render_template("questions.html", prompts = prompts)

@app.route('/story')
def your_story():
    """Show generated story"""

    text = story.generate(request.args)
    return render_template("story.html", text = text)