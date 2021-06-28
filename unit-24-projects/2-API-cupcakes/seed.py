from app import app
from models import db, Cupcake

# connect_db(app)
# Create all tables
db.drop_all()
db.create_all()

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes_db'
print("###########################")
print(db)

c1 = Cupcake(
    flavor="cherry",
    size="large",
    rating=5,
)

c2 = Cupcake(
    flavor="chocolate",
    size="small",
    rating=9,
    image_url="https://www.bakedbyrachel.com/wp-content/uploads/2018/01/chocolatecupcakesccfrosting1_bakedbyrachel.jpg"
)

db.session.add_all([c1, c2])
db.session.commit()