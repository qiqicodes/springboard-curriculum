-- from the terminal run:
-- psql < outer_space.sql

DROP DATABASE IF EXISTS outer_space;

CREATE DATABASE outer_space;

\c outer_space

CREATE TABLE "Planets" (
    "PlanetID" int   NOT NULL,
    "Name" text   NOT NULL,
    "OrbitsAround" int   NOT NULL,
    "OrbitalPeriodInYears" float   NOT NULL,
    "MoonID" int[]
    CONSTRAINT "pk_Planets" PRIMARY KEY (
        "PlanetID"
     )
);

CREATE TABLE "Moons" (
    "MoonID" int   NOT NULL,
    "Name" text   NOT NULL,
    CONSTRAINT "pk_Moons" PRIMARY KEY (
        "MoonID"
     )
);

CREATE TABLE "Stars" (
    "StarID" int   NOT NULL,
    "Name" text   NOT NULL,
    "PlanetID" int[]
    CONSTRAINT "pk_Stars" PRIMARY KEY (
        "StarID"
     )
);

CREATE TABLE "Galaxies" (
    "GalaxyID" int   NOT NULL,
    "Name" text   NOT NULL,
    "StarID" int[]
    CONSTRAINT "pk_Galaxies" PRIMARY KEY (
        "GalaxyID"
     )
);

ALTER TABLE "Planets" ADD CONSTRAINT "fk_Planets_OrbitsAround" FOREIGN KEY("OrbitsAround")
REFERENCES "Stars" ("StarID");

ALTER TABLE "Planets" ADD CONSTRAINT "fk_Planets_MoonID" FOREIGN KEY("MoonID")
REFERENCES "Moons" ("MoonID");

ALTER TABLE "Stars" ADD CONSTRAINT "fk_Stars_PlanetID" FOREIGN KEY("PlanetID")
REFERENCES "Planets" ("PlanetID");

ALTER TABLE "Galaxies" ADD CONSTRAINT "fk_Galaxies_StarID" FOREIGN KEY("StarID")
REFERENCES "Stars" ("StarID");