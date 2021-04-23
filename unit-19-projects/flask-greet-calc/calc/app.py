from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)

@app.route("/add")
def addition():
    """Add a and b."""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    res = add(a, b)
    return str(res)

@app.route("/sub")
def subtraction():
    """Subtract b by a."""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    res = sub(a, b)
    return str(res)

@app.route("/mult")
def multiplication():
    """Multiply a and b."""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    res = mult(a, b)
    return str(res)

@app.route("/div")
def division():
    """Divide a by b."""

    a = int(request.args.get("a"))
    b = int(request.args.get("b"))
    res = div(a, b)
    return str(res)