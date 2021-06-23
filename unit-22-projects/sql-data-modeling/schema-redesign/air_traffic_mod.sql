DROP DATABASE IF EXISTS air_traffic;

CREATE DATABASE air_traffic;

\c air_traffic

CREATE TABLE "Passengers" (
    "PassengerID" int   NOT NULL,
    "FirstName" text   NOT NULL,
    "LastName" text   NOT NULL,
    CONSTRAINT "pk_Passengers" PRIMARY KEY (
        "PassengerID"
     )
);

CREATE TABLE "Tickets" (
    "TicketID" int   NOT NULL,
    "PassengerID" int   NOT NULL,
    "FlightID" int   NOT NULL,
    "Seat" text   NOT NULL,
    CONSTRAINT "pk_Tickets" PRIMARY KEY (
        "TicketID"
     )
);

CREATE TABLE "Flights" (
    "FlightID" int   NOT NULL,
    "Name" text   NOT NULL,
    "AirlineID" int   NOT NULL,
    "Departure" timestamp   NOT NULL,
    "Arrival" timestamp   NOT NULL,
    "FromCity" text   NOT NULL,
    "FromCountry" text   NOT NULL,
    "ToCity" text   NOT NULL,
    "ToCountry" text   NOT NULL,
    CONSTRAINT "pk_Flights" PRIMARY KEY (
        "FlightID"
     )
);

CREATE TABLE "Airlines" (
    "AirlineID" int   NOT NULL,
    "Name" text   NOT NULL,
    CONSTRAINT "pk_Airlines" PRIMARY KEY (
        "AirlineID"
     )
);

ALTER TABLE "Tickets" ADD CONSTRAINT "fk_Tickets_PassengerID" FOREIGN KEY("PassengerID")
REFERENCES "Passengers" ("PassengerID");

ALTER TABLE "Tickets" ADD CONSTRAINT "fk_Tickets_FlightID" FOREIGN KEY("FlightID")
REFERENCES "Flights" ("FlightID");

ALTER TABLE "Flights" ADD CONSTRAINT "fk_Flights_AirlineID" FOREIGN KEY("AirlineID")
REFERENCES "Airlines" ("AirlineID");
