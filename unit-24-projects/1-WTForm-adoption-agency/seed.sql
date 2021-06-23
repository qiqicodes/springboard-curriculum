-- from the terminal run:
-- psql < seed.sql

DROP DATABASE IF EXISTS adoption_agency;

CREATE DATABASE adoption_agency;

\c adoption_agency

CREATE TABLE pets
(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  photo_url TEXT,
  age INT,
  notes TEXT,
  available BOOLEAN NOT NULL DEFAULT TRUE

);

INSERT INTO pets
  (name, species, photo_url, age, notes, available)
VALUES
  ('Foo', 'dog', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2019%2F08%2Fcorgi-dog-name-POPDOGS0819.jpg', 4, 'high energy', 'TRUE'),
  ('Bar', 'cat', 'https://www.rover.com/blog/wp-content/uploads/2019/06/cat-2934720_1920.jpg', 11, null, 'FALSE'),
  ('Coco', 'porcupine', 'https://cdn.pixabay.com/photo/2018/08/06/23/32/nature-3588682__480.jpg', 5, 'shy', 'TRUE'),
  ('Momo', 'dog', null, null, 'playful and friendly', 'TRUE');
