CREATE TABLE "Regions" (
    "RegionID" int   NOT NULL,
    "Name" string   NOT NULL,
    CONSTRAINT "pk_Regions" PRIMARY KEY (
        "RegionID"
     )
);

CREATE TABLE "Users" (
    "UserID" int   NOT NULL,
    "Name" string   NOT NULL,
    "Password" string   NOT NULL,
    "Email" string   NOT NULL,
    "PreferredRegionID" int   NOT NULL,
    CONSTRAINT "pk_Users" PRIMARY KEY (
        "UserID"
     )
);

CREATE TABLE "Categories" (
    "CategoryID" int   NOT NULL,
    "Name" string   NOT NULL,
    CONSTRAINT "pk_Categories" PRIMARY KEY (
        "CategoryID"
     )
);

CREATE TABLE "Posts" (
    "PostID" int   NOT NULL,
    "UserID" int   NOT NULL,
    "RegionID" int   NOT NULL,
    "CategoryID" int   NOT NULL,
    "Title" text   NOT NULL,
    "Description" text   NOT NULL,
    "Price" money   NOT NULL,
    "PreciseLocation" string   NOT NULL,
    CONSTRAINT "pk_Posts" PRIMARY KEY (
        "PostID"
     )
);

ALTER TABLE "Users" ADD CONSTRAINT "fk_Users_PreferredRegionID" FOREIGN KEY("PreferredRegionID")
REFERENCES "Regions" ("RegionID");

ALTER TABLE "Posts" ADD CONSTRAINT "fk_Posts_UserID" FOREIGN KEY("UserID")
REFERENCES "Users" ("UserID");

ALTER TABLE "Posts" ADD CONSTRAINT "fk_Posts_RegionID" FOREIGN KEY("RegionID")
REFERENCES "Regions" ("RegionID");

ALTER TABLE "Posts" ADD CONSTRAINT "fk_Posts_CategoryID" FOREIGN KEY("CategoryID")
REFERENCES "Categories" ("CategoryID");

