from unittest import TestCase

from app import app
from models import db, User, Post, Tag, PostTag

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False

app.config['TESTING'] = True

app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

db.drop_all()
db.create_all()

class PostsTagsViewTestCase(TestCase):
    '''Test for posts tags many to many relationship'''

    def setUp(self):
        '''Add test user, test post to test tags'''
        
        PostTag.query.delete()
        Tag.query.delete()
        Post.query.delete()
        User.query.delete()

        user = User(first_name='John', last_name='Wayne')
        db.session.add(user)
        db.session.commit()

        post1 = Post(title="TestPost1", content="aaa", user_id=user.id)
        post2 = Post(title="TestPost2", content="bbb", user_id=user.id)
        db.session.add(post1)
        db.session.add(post2)
        db.session.commit()

        tag1 = Tag(name="TestTag1", posts=Post.query.filter(Post.id.in_([post1.id, post2.id])).all())
        tag2 = Tag(name="TestTag2", posts=Post.query.filter(Post.id.in_([post2.id])).all())
        
        db.session.add(tag1)
        db.session.add(tag2)
        db.session.commit()

        self.user_id = user.id
        self.post1_id = post1.id
        self.post2_id = post2.id
        self.tag1_id = tag1.id 
        self.tag2_id = tag2.id 

    def tearDown(self):
        '''Clean up any unallowed addition from stage'''

        db.session.rollback() 

    def test_redirect_homepage_to_list_5_recent_posts(self):
        with app.test_client() as client:
            resp = client.get('/')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Happiness Blog Recent 5 Posts</h1>', html)
            self.assertIn('<span class="badge badge-info px-3 py-2">TestTag1</span>', html)

    def test_list_tags(self):
        with app.test_client() as client:
            resp = client.get('/tags')
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('TestTag1', html)
            self.assertIn('TestTag2', html)

    def test_show_tag1_detail(self):
        with app.test_client() as client:
            resp = client.get(f'/tags/{self.tag1_id}')

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>TestTag1</h1>', html)
            self.assertIn(f'<a href="/posts/{self.post1_id}">TestPost1</a>', html)
            self.assertIn(f'<a href="/posts/{self.post2_id}">TestPost2</a>', html)

    def test_show_tag2_detail(self):
        with app.test_client() as client:
            resp = client.get(f'/tags/{self.tag2_id}')

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>TestTag2</h1>', html)
            self.assertIn(f'<a href="/posts/{self.post2_id}">TestPost2</a>', html)
    
    def test_show_add_tag_form(self):
        with app.test_client() as client:
            resp = client.get(f'/tags/new')

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Create a tag</h1>', html)
    
    def test_add_tag(self):
        with app.test_client() as client:
            data = {"name": "DataTestTag"}
            resp = client.post("/tags/new", data=data, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn(f'<a href="/tags/3">DataTestTag</a>', html)

    def test_show_edit_tag_form(self):
        with app.test_client() as client:
            resp = client.get(f'/tags/{self.tag1_id}/edit')

            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<h1>Edit a tag</h1>', html)
            self.assertIn('value="TestTag1', html)
    