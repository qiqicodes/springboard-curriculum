from flask import Flask, request

app = Flask(__name__)


@app.route('/')
def home_page():
    """Shows home page"""
    html = """ 
    <html>
      <body>
        <h1>Home Page</h1>
        <p>Welcome to my simple app!</p>
        <a href='/hello'>Go to hello page</a>
      </body>
    </html>
    """
    return html


@app.route('/hello')
def say_hello():
    """Shows hello page"""
    html = """ 
    <html>
      <body>
        <h1>Hello!</h1>
        <p>This is the hello page</p>
      </body>
    </html>
    """
    return html


@app.route('/goodbye')
def say_bye():
    """Says good bye"""
    return "GOOD BYE!!!"


@app.route('/search')
def search():
    """Shows search results.  Looks for term & sort in query string"""
    term = request.args["term"]
    sort = request.args["sort"]
    return f"<h1>Search Results For: {term}</h1> <p>Sorting by: {sort}</p>"


# @app.route("/post", methods=["POST"])
# def post_demo():
#     return "YOU MADE A POST  REQUEST!"


# @app.route("/post", methods=["GET"])
# def get_demo():
#     return "YOU MADE A GET REQUEST!"


@app.route('/add-comment')
def add_comment_form():
    """Shows add comment form"""
    return """
    <h1>Add Comment </h1>
    <form method="POST">
      <input type='text' placeholder='comment' name='comment'/>
      <input type='text' placeholder='username' name='username'/>
      <button>Submit</button>
    </form>
  """


@app.route('/add-comment', methods=["POST"])
def save_comment():
    """Saves comment data (pretends to)"""

    comment = request.form["comment"]
    username = request.form["username"]
    return f"""
      <h1>SAVED YOUR COMMENT</h1>
      <ul>
        <li>Username: {username}</li>
        <li>Comment: {comment}</li>
      </ul>
    """


@app.route('/r/<subreddit>')
def show_subreddit(subreddit):
    return f"<h1>Browsing The {subreddit} Subreddit</h1>"


@app.route("/r/<subreddit>/comments/<int:post_id>")
def show_comments(subreddit, post_id):
    return f"<h1>Viewing comments for post with id: {post_id} from the {subreddit} Subreddit</h1>"


POSTS = {
    1: "I like chicken tenders",
    2: "I hate mayo!",
    3: "Double rainbow all the way",
    4: "YOLO OMG (kill me)"
}


@app.route('/posts/<int:id>')
def find_post(id):
    post = POSTS.get(id,  "Post not found")
    return f"<p>{post}</p>"
