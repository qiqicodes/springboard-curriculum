from flask import Flask, request, render_template, redirect, flash, jsonify, session, make_response
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

RESPONSES_LIST = "responses"

app = Flask(__name__)
app.config["SECRET_KEY"] = "fufu123"
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False

debug = DebugToolbarExtension(app)


@app.route('/')
def show_start_page():
    """Select a survey"""
    return render_template("start.html", survey=survey)

@app.route('/start', methods=["POST"])
def start_survey():
    """Directs user to first question page, clear the session of user responses"""
    session[RESPONSES_LIST] = []
    return redirect("/questions/0")

@app.route("/questions/<int:question_id>")
def show_question(question_id):
    """Show current question"""
    responses = session.get(RESPONSES_LIST)

    # trying to access question page before the response list is initiated
    if (responses is None):
        return redirect("/")

    # if all questions are answered
    if (len(responses) == len(survey.questions)):
        return redirect("/complete")

    # step 7 flash message & ban out of order access
    if (len(responses) != question_id):
        flash(f"Invalid question id: {question_id}.")
        return redirect(f"/questions/{len(responses)}")

    question = survey.questions[question_id]
    return render_template(
        "question.html", question_num=question_id, question=question)


@app.route('/answer', methods=["POST"])
def handle_answer():
    # get choice from form
    choice = request.form["answer"]

    # add to responses list
    responses = session[RESPONSES_LIST]
    responses.append(choice)
    session[RESPONSES_LIST] = responses

    if (len(responses) == len(survey.questions)):
    # They've answered all the questions! Thank them.
        return redirect("/complete")

    else:
        return redirect(f"/questions/{len(responses)}")




@app.route('/complete')
def complete_survey():
    """Direct user to completion page with a thank you note"""
    return render_template("completion.html")