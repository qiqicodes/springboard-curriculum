CREATE TABLE "Doctors" (
    "DoctorID" int   NOT NULL,
    "Name" string   NOT NULL,
    "Specialty" string   NOT NULL,
    CONSTRAINT "pk_Doctors" PRIMARY KEY (
        "DoctorID"
     )
);

CREATE TABLE "Patients" (
    "PatientID" int   NOT NULL,
    "Name" string   NOT NULL,
    "Insurance" string   NOT NULL,
    "Birthday" date   NOT NULL,
    "Address" string   NOT NULL,
    CONSTRAINT "pk_Patients" PRIMARY KEY (
        "PatientID"
     )
);

CREATE TABLE "Diseases" (
    "DiseaseID" int   NOT NULL,
    "Name" string   NOT NULL,
    "DiseaseDetail" text   NOT NULL,
    CONSTRAINT "pk_Diseases" PRIMARY KEY (
        "DiseaseID"
     )
);

CREATE TABLE "Visits" (
    "VisitID" int   NOT NULL,
    "DoctorID" int   NOT NULL,
    "PatientID" int   NOT NULL,
    "Date" date   NOT NULL,
    CONSTRAINT "pk_Visits" PRIMARY KEY (
        "VisitID"
     )
);

CREATE TABLE "Diagnoses" (
    "DiagnosisID" int   NOT NULL,
    "VisitID" int   NOT NULL,
    "DiseaseID" int   NOT NULL,
    CONSTRAINT "pk_Diagnoses" PRIMARY KEY (
        "DiagnosisID"
     )
);

ALTER TABLE "Visits" ADD CONSTRAINT "fk_Visits_DoctorID" FOREIGN KEY("DoctorID")
REFERENCES "Doctors" ("DoctorID");

ALTER TABLE "Visits" ADD CONSTRAINT "fk_Visits_PatientID" FOREIGN KEY("PatientID")
REFERENCES "Patients" ("PatientID");

ALTER TABLE "Diagnoses" ADD CONSTRAINT "fk_Diagnoses_VisitID" FOREIGN KEY("VisitID")
REFERENCES "Visits" ("VisitID");

ALTER TABLE "Diagnoses" ADD CONSTRAINT "fk_Diagnoses_DiseaseID" FOREIGN KEY("DiseaseID")
REFERENCES "Diseases" ("DiseaseID");

