from flask import Flask, request, render_template, redirect, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

app = Flask(__name__)
app.config["SECRET_KEY"] = "fufu123"
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False

debug = DebugToolbarExtension(app)

@app.route('/')
def show_start_page():
    """Select a survey"""
    return render_template("start.html", survey=survey)

@app.route('/start', methods=["POST"])
def show_question_page():
    """Check if redirect is happenly appropriately"""
    return render_template("question.html")