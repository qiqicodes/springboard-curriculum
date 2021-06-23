CREATE TABLE "Teams" (
    "TeamID" int   NOT NULL,
    "Name" string   NOT NULL,
    "Location" string   NOT NULL,
    "CoachID" int   NOT NULL,
    CONSTRAINT "pk_Teams" PRIMARY KEY (
        "TeamID"
     )
);

CREATE TABLE "Coaches" (
    "CoachID" int   NOT NULL,
    "Name" string   NOT NULL,
    "YearsOfExperience" int   NOT NULL,
    CONSTRAINT "pk_Coaches" PRIMARY KEY (
        "CoachID"
     )
);

CREATE TABLE "Players" (
    "PlayerID" int   NOT NULL,
    "Name" string   NOT NULL,
    "SquadNumber" int   NOT NULL,
    "Nationality" string   NOT NULL,
    "Position" string   NOT NULL,
    "CurrentTeamID" int   NOT NULL,
    "PastTeamID" int   NOT NULL,
    CONSTRAINT "pk_Players" PRIMARY KEY (
        "PlayerID"
     )
);

CREATE TABLE "Referees" (
    "RefereeID" int   NOT NULL,
    "Name" string   NOT NULL,
    CONSTRAINT "pk_Referees" PRIMARY KEY (
        "RefereeID"
     )
);

CREATE TABLE "Seasons" (
    "SeasonID" int   NOT NULL,
    "StartDate" date   NOT NULL,
    "EndDate" date   NOT NULL,
    CONSTRAINT "pk_Seasons" PRIMARY KEY (
        "SeasonID"
     )
);

CREATE TABLE "Lineups" (
    "LineupID" int   NOT NULL,
    "Date" date   NOT NULL,
    "MatchID" int   NOT NULL,
    "TeamID" int   NOT NULL,
    "PlayerID" int   NOT NULL,
    CONSTRAINT "pk_Lineups" PRIMARY KEY (
        "LineupID"
     )
);

CREATE TABLE "Matches" (
    "MatchID" int   NOT NULL,
    "SeasonID" int   NOT NULL,
    "Date" date   NOT NULL,
    "StartTime" time   NOT NULL,
    "EndTime" time   NOT NULL,
    "Location" string   NOT NULL,
    "HomeTeamID" int   NOT NULL,
    "AwayTeamID" int   NOT NULL,
    "HeadReferee" int   NOT NULL,
    "AssistantRefereeOne" int   NOT NULL,
    "AssistantRefereeTwo" int   NOT NULL,
    CONSTRAINT "pk_Matches" PRIMARY KEY (
        "MatchID"
     )
);

CREATE TABLE "Goals" (
    "GoalID" int   NOT NULL,
    "MatchID" int   NOT NULL,
    "PlayerID" int   NOT NULL,
    "GoalScore" int   NOT NULL,
    CONSTRAINT "pk_Goals" PRIMARY KEY (
        "GoalID"
     )
);

CREATE TABLE "Results" (
    "ResultID" int   NOT NULL,
    "HomeTeamID" int   NOT NULL,
    "MatchID" int   NOT NULL,
    "Result" choice(win,loss,draw)   NOT NULL,
    CONSTRAINT "pk_Results" PRIMARY KEY (
        "ResultID"
     )
);

CREATE TABLE "Rankings" (
    "RankingID" int   NOT NULL,
    "TeamID" int   NOT NULL,
    "Points" int   NOT NULL,
    "GamePlayed" int   NOT NULL,
    "Wins" int   NOT NULL,
    "Draws" int   NOT NULL,
    "Losses" int   NOT NULL,
    CONSTRAINT "pk_Rankings" PRIMARY KEY (
        "RankingID"
     )
);

ALTER TABLE "Teams" ADD CONSTRAINT "fk_Teams_CoachID" FOREIGN KEY("CoachID")
REFERENCES "Coaches" ("CoachID");

ALTER TABLE "Players" ADD CONSTRAINT "fk_Players_CurrentTeamID" FOREIGN KEY("CurrentTeamID")
REFERENCES "Teams" ("TeamID");

ALTER TABLE "Players" ADD CONSTRAINT "fk_Players_PastTeamID" FOREIGN KEY("PastTeamID")
REFERENCES "Teams" ("TeamID");

ALTER TABLE "Lineups" ADD CONSTRAINT "fk_Lineups_MatchID" FOREIGN KEY("MatchID")
REFERENCES "Matches" ("MatchID");

ALTER TABLE "Lineups" ADD CONSTRAINT "fk_Lineups_TeamID" FOREIGN KEY("TeamID")
REFERENCES "Teams" ("TeamID");

ALTER TABLE "Lineups" ADD CONSTRAINT "fk_Lineups_PlayerID" FOREIGN KEY("PlayerID")
REFERENCES "Players" ("PlayerID");

ALTER TABLE "Matches" ADD CONSTRAINT "fk_Matches_SeasonID" FOREIGN KEY("SeasonID")
REFERENCES "Seasons" ("SeasonID");

ALTER TABLE "Matches" ADD CONSTRAINT "fk_Matches_HomeTeamID" FOREIGN KEY("HomeTeamID")
REFERENCES "Teams" ("TeamID");

ALTER TABLE "Matches" ADD CONSTRAINT "fk_Matches_AwayTeamID" FOREIGN KEY("AwayTeamID")
REFERENCES "Teams" ("TeamID");

ALTER TABLE "Matches" ADD CONSTRAINT "fk_Matches_HeadReferee" FOREIGN KEY("HeadReferee")
REFERENCES "Referees" ("RefereeID");

ALTER TABLE "Matches" ADD CONSTRAINT "fk_Matches_AssistantRefereeOne" FOREIGN KEY("AssistantRefereeOne")
REFERENCES "Referees" ("RefereeID");

ALTER TABLE "Matches" ADD CONSTRAINT "fk_Matches_AssistantRefereeTwo" FOREIGN KEY("AssistantRefereeTwo")
REFERENCES "Referees" ("RefereeID");

ALTER TABLE "Goals" ADD CONSTRAINT "fk_Goals_MatchID" FOREIGN KEY("MatchID")
REFERENCES "Matches" ("MatchID");

ALTER TABLE "Goals" ADD CONSTRAINT "fk_Goals_PlayerID" FOREIGN KEY("PlayerID")
REFERENCES "Players" ("PlayerID");

ALTER TABLE "Results" ADD CONSTRAINT "fk_Results_HomeTeamID" FOREIGN KEY("HomeTeamID")
REFERENCES "Teams" ("TeamID");

ALTER TABLE "Results" ADD CONSTRAINT "fk_Results_MatchID" FOREIGN KEY("MatchID")
REFERENCES "Matches" ("MatchID");

ALTER TABLE "Rankings" ADD CONSTRAINT "fk_Rankings_TeamID" FOREIGN KEY("TeamID")
REFERENCES "Teams" ("TeamID");

