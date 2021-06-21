from flask import Flask, request, render_template, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)
app.config["SECRET_KEY"] = "oh-so-secret"

debug= DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route("/")
def home():
    '''Show boggle board'''

    board = boggle_game.make_board()
    session['board'] = board
    
    highscore = session.get('highscore', 0)
    
    return render_template("index.html", board = board, highscore=highscore)



@app.route("/validate-word")
def check_valid_word():
    '''Check if the word is in the words.txt dictionary'''

    word = request.args["word"]
    board = session["board"]
    result_response = boggle_game.check_valid_word(board, word)

    return jsonify({'result': result_response})



@app.route("/post-score", methods=["POST"])
def post_score():
    '''Update score'''

    score = request.json["score"]
    highscore = session.get("highscore", 0)

    session["highscore"] = max(score, highscore)

    return jsonify(brokeRecord = score > highscore)
