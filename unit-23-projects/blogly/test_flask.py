from unittest import TestCase

from app import app
from models import db, User, Post

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

# Make Flask errors be real errors, rather than HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()

class UserViewsTestCase(TestCase):
    '''Test for views for users'''

    def setUp(self):
        '''Add test user and test posts'''
        Post.query.delete()
        User.query.delete()
  
        user = User(first_name='Jonah', last_name='Whale', image_url='https://www.bhpublishinggroup.com/wp-content/uploads/2018/11/9781535954341.png')
        db.session.add(user)
        db.session.commit()



        post1 = Post(title="TestPost1", content="aaa", user_id=user.id)
        post2 = Post(title="TestPost2", content="bbb", user_id=user.id)
        db.session.add(post1)
        db.session.add(post2)
        db.session.commit()

        self.user_id = user.id
        self.post1_id = post1.id
        self.post2_id = post2.id

    def tearDown(self):
        '''Clean up any unallowed addition from stage'''

        db.session.rollback()

    def test_redirect_homepage_to_list_5_recent_posts(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Happiness Blog Recent 5 Posts</h1>', html)

    def test_list_users(self):
        with app.test_client() as client:
            resp = client.get('/users')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('Jonah', html)


    def test_show_user(self):
        with app.test_client() as client:
            resp = client.get(f"/users/{self.user_id}")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Jonah Whale</h1>', html)
    
    def test_add_user(self):
        with app.test_client() as client:
            data = {"first_name": "Daniel", "last_name": "Lion"}
            resp = client.post("/users/new", data=data, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn(f'<a href="/users/3">Daniel Lion</a>', html)

    def test_list_posts(self):
        with app.test_client() as client:
            resp = client.get(f'/posts/{self.post1_id}')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('aaa', html)

    def test_show_post_detail(self):
        with app.test_client() as client:
            resp = client.get(f'/posts/{self.post2_id}')

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>TestPost2</h1>', html)

    def test_show_add_post_form(self):
        with app.test_client() as client:
            resp = client.get(f'/users/{self.user_id}/posts/new')

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Add Post for Jonah Whale</h1>', html)
    
    def test_add_post(self):
        with app.test_client() as client:
            data = {"title": "DataPost", "content": "ddd"}
            resp = client.post(f"/users/{self.user_id}/posts/new", data=data, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn(f'<a href="/posts/3">DataPost</a>', html)