from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def home_page():
    html = '''
    <html>
        <body>
            <h1>Home Page</h1>
            <p>Welcome to my simple app!</p>
            <a href='/hello'>Go to the hello page</a>
        </body>
    </html>
    '''
    return html

@app.route('/hello')
def say_hello():
    html = '''
    <html>
        <body>
            <h1>Hello</h1>
            <p>This is the hello page</p>
        </body>
    </html>
    '''
    return html


@app.route('/goodbye')
def say_bye():
    return "GOODBYE!"

@app.route('/search')
def search():
    # print(request.args)
    term = request.args['term']
    return f"<h1>SEARCH Results For: {term}</h1>"