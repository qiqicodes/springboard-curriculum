"""Seed file to make sample data for pets db."""


from models import db, connect_db, Pet
from app import app

connect_db(app)
# Create all tables
db.drop_all()
db.create_all()

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adoption_agency'

# If table isn't empty, empty it
Pet.query.delete()

# Add pets
foo = Pet(name='Foo', species='dog', photo_url='https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2019%2F08%2Fcorgi-dog-name-POPDOGS0819.jpg', age=4, notes='high energy', available=True)
bar = Pet(name='Bar', species='cat', photo_url='https://www.rover.com/blog/wp-content/uploads/2019/06/cat-2934720_1920.jpg', age=11, available=False)
coco = Pet(name='Coco', species='porcupine', photo_url='https://cdn.pixabay.com/photo/2018/08/06/23/32/nature-3588682__480.jpg', age=4, notes='high energy', available=True)
momo = Pet(name='Momo', species='dog', notes='playful and friendly')
whiskey = Pet(name='Whiskey', species="dog")
bowser = Pet(name='Bowser', species="dog")
spike = Pet(name='Spike', species="porcupine")

# Add new objects to session, so they'll persist

db.session.add(foo)
db.session.add(bar)
db.session.add(coco)
db.session.add(momo)
db.session.add(whiskey)
db.session.add(bowser)
db.session.add(spike)

# Commit--otherwise, this never gets saved!
db.session.commit()