DROP DATABASE IF EXISTS music;

CREATE DATABASE music;

\c music

CREATE TABLE "Songs" (
    "SongID" int   NOT NULL,
    "Title" text   NOT NULL,
    "Duration" int   NOT NULL,
    "ReleaseDate" date   NOT NULL,
    "ArtistsID" int   NOT NULL,
    "Producers" int   NOT NULL,
    CONSTRAINT "pk_Songs" PRIMARY KEY (
        "SongID"
     )
);

CREATE TABLE "Artists" (
    "ArtistID" int   NOT NULL,
    "Name" text   NOT NULL,
    "AlbumID" int   NOT NULL,
    CONSTRAINT "pk_Artists" PRIMARY KEY (
        "ArtistID"
     )
);

CREATE TABLE "Producers" (
    "ProducerID" int   NOT NULL,
    "Name" text   NOT NULL,
    CONSTRAINT "pk_Producers" PRIMARY KEY (
        "ProducerID"
     )
);

CREATE TABLE "Albums" (
    "AlbumID" int   NOT NULL,
    "SongID" int   NOT NULL,
    CONSTRAINT "pk_Albums" PRIMARY KEY (
        "AlbumID"
     )
);

ALTER TABLE "Songs" ADD CONSTRAINT "fk_Songs_ArtistsID" FOREIGN KEY("ArtistsID")
REFERENCES "Artists" ("ArtistID");

ALTER TABLE "Songs" ADD CONSTRAINT "fk_Songs_Producers" FOREIGN KEY("Producers")
REFERENCES "Producers" ("ProducerID");

ALTER TABLE "Artists" ADD CONSTRAINT "fk_Artists_AlbumID" FOREIGN KEY("AlbumID")
REFERENCES "Albums" ("AlbumID");

ALTER TABLE "Albums" ADD CONSTRAINT "fk_Albums_SongID" FOREIGN KEY("SongID")
REFERENCES "Songs" ("SongID");
