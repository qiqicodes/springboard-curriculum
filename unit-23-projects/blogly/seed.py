"""Seed file to make sample data for users db."""


from models import db, connect_db, User, Post
from app import app

connect_db(app)
# Create all tables
db.drop_all()
db.create_all()

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'

# If table isn't empty, empty it
User.query.delete()


#Add users
jane = User(first_name='Jane', last_name='Smith', image_url='https://caparamedic.org/wp-content/uploads/2018/12/DB1P2063.jpg')
jojo = User(first_name='Jojo', last_name='Jones', image_url='https://cdn.shopify.com/s/files/1/0279/0277/1337/articles/jojo_1024x1024.jpg?v=1594068223')
jim = User(first_name='Jim', last_name='Choo')

# Add new objects to session, so they'll persist
db.session.add(jane)
db.session.add(jojo)
db.session.add(jim)

# Commit--otherwise, this never gets saved!
db.session.commit()

Post.query.delete()

post1 = Post(title="Post1", content="aaa", user_id=jane.id)
post2 = Post(title="Post2", content="bbb", user_id=jane.id)
post3 = Post(title="Post3", content="ccc", user_id=jane.id)

db.session.add(post1)
db.session.add(post2)
db.session.add(post3)
db.session.commit()