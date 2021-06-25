"""Blogly application."""

from os import name
from flask import Flask, request, redirect, render_template, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension

from models import db, connect_db, User, Post, Tag

app = Flask(__name__)
app.config['SECRET_KEY'] = 'OH-SO-SECRET'

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

# In case need to turn of redirects:
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)


@app.route('/')
def homepage():
    '''Homepage shows 5 most recent posts'''
    
    posts = Post.query.order_by(Post.created_at.desc()).limit(5).all()
    return render_template("posts/homepage.html", posts=posts)

@app.errorhandler(404)
def page_not_found(e):
    '''Show custom 404 Not Found page'''

    return render_template('404.html'), 404

# USER ROUTES

@app.route('/users')
def show_users():
    '''Show all users order by last name then first name'''

    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template('users/index.html', users=users)

@app.route('/users/new', methods=["GET"])
def show_add_user_form():
    '''Show add new user form'''

    return render_template('/users/new.html')

@app.route('/users/new', methods=["POST"])
def add_user():
    '''Add user to database'''

    # import pdb; pdb.set_trace()
    
    new_user = User(
        first_name=request.form['first_name'],
        last_name=request.form['last_name'])

    db.session.add(new_user)
    db.session.commit()

    flash(f"Added {new_user.get_full_name}'s Profile.")
    return redirect("/users")


@app.route('/users/<int:user_id>')
def show_selected_user(user_id):
    '''Show information about the given user'''

    user = User.query.get_or_404(user_id)
    return render_template('users/details.html', user=user )

@app.route('/users/<int:user_id>/edit')
def show_edit_user_form(user_id):
    '''Show edit form for existing user'''

    user = User.query.get_or_404(user_id)
    return render_template(f'users/edit.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=["POST"])
def update_user(user_id):
    '''Edit existing user'''

    user = User.query.get_or_404(user_id)
    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.image_url = request.form['image_url']

    db.session.add(user)
    db.session.commit()
    
    flash(f"Updated {user.get_full_name}'s Profile.")
    return redirect("/users")

@app.route('/users/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):
    '''Delete existing user from database'''

    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()

    flash(f"Deleted {user.get_full_name}.")
    return redirect("/users")

@app.route('/api/users/<int:user_id>', methods=["GET"])
def api_get_user(user_id):
    '''Return user info in JSON'''

    user = User.query.get_or_404(user_id)
    info = {"first-name": user.first_name, "last-name": user.last_name, "image_url": user.image_url}

    return jsonify(info)

# POST ROUTES
@app.route('/users/<int:user_id>/posts/new')
def show_add_post_form(user_id):
    '''Show add new post form'''

    
    user = User.query.get_or_404(user_id)
    tags = Tag.query.all()
    return render_template('/posts/new.html', user=user, tags=tags)

@app.route('/users/<int:user_id>/posts/new', methods=['POST'])
def add_post(user_id):
    '''Add post to database'''

    user = User.query.get_or_404(user_id)
    tag_ids = [int(id) for id in request.form.getlist('tags')]
    tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

    new_post = Post(
        title=request.form['title'],
        content=request.form['content'],
        user = user,
        tags = tags
        )

    db.session.add(new_post)
    db.session.commit()

    flash(f"Added {new_post.title} to { user.first_name }'s Profile.")
    return redirect(f"/users/{user.id}")

@app.route('/posts/<int:post_id>')
def show_selected_post(post_id):
    '''Show post detail'''

    post = Post.query.get_or_404(post_id)
    
    return render_template('/posts/details.html', post=post)

@app.route('/posts/<int:post_id>/edit')
def show_edit_post_form(post_id):
    '''Show edit form for existing post'''

    post = Post.query.get_or_404(post_id)
    tags = Tag.query.all()
    return render_template(f'posts/edit.html', post=post, tags=tags)

@app.route('/posts/<int:post_id>/edit', methods=['POST'])
def update_post(post_id):
    '''Edit existing post'''

    post = Post.query.get_or_404(post_id)
    tag_ids = [int(id) for id in request.form.getlist('tags')]
    tags = Tag.query.filter(Tag.id.in_(tag_ids)).all()

    post.title = request.form['title']
    post.content = request.form['content']
    post.tags = tags

    db.session.add(post)
    db.session.commit()
    
    flash(f"Updated Post: {post.title}.")
    return redirect(f"/users/{post.user_id}")

@app.route('/posts/<int:post_id>/delete', methods=['POST'])
def delete_post(post_id):
    '''Delete existing post from database'''

    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()

    flash(f"Deleted Post: {post.title}.")
    return redirect(f"/users/{post.user_id}")

#TAG ROUTES 
@app.route('/tags')
def show_all_tags():
    '''Lists all tags, with links to the tag detail page'''

    tags = Tag.query.all()
    return render_template('/tags/index.html', tags=tags)

@app.route('/tags/<int:tag_id>')
def show_tag_detail(tag_id):
    '''Show tag detail'''

    tag = Tag.query.get_or_404(tag_id)
    return render_template('/tags/details.html', tag=tag)

@app.route('/tags/new')
def show_add_tag_form():
    '''Show add new tag form'''

    return render_template('/tags/new.html')

#TODO: Update Routes to connect to PostsTags
@app.route('/tags/new', methods=["POST"])
def add_tag():
    '''Add tag to database'''

    post_ids = [int(id) for id in request.form.getlist('posts')]
    posts = Post.query.filter(Post.id.in_(post_ids)).all()
    
    new_tag = Tag(
        name=request.form['name'], posts=posts
    )
    db.session.add(new_tag)
    db.session.commit()

    flash(f"Added {new_tag.name} to Database.")
    return redirect("/tags")

@app.route('/tags/<int:tag_id>/edit')
def show_edit_tag_form(tag_id):
    '''Show edit form for existing tag'''
    
    tag = Tag.query.get_or_404(tag_id)
    return render_template('/tags/edit.html', tag=tag)

#TODO: Update Routes to connect PostsTags
@app.route('/tags/<int:tag_id>/edit', methods=["POST"])
def update_tag(tag_id):
    '''Process edit form, edit tag, and redirects to the tags list'''

    tag = Tag.query.get_or_404(tag_id)
    tag.name = request.form['name']

    db.session.add(tag)
    db.session.commit()
    
    flash(f"Updated Tag: {tag.name}.")
    return redirect(f"/tags/{tag.id}")

@app.route('/tags/<int:tag_id>/delete', methods=["POST"])
def delete_tag(tag_id):
    '''Delete a tag'''

    tag = Tag.query.get_or_404(tag_id)
    db.session.delete(tag)
    db.session.commit()

    flash(f"Deleted Tag: {tag.name}.")
    return redirect("/tags")
