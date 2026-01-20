CREATE TABLE "library" (
  "id" integer PRIMARY KEY,
  "user_id" integer NOT NULL,
  "book_id" integer NOT NULL,
  "status" varchar(42) NOT NULL,
  "created_at" timestamp
);

CREATE TABLE "user" (
  "id" integer PRIMARY KEY,
  "email" varchar(50) NOT NULL,
  "username" varchar(15) NOT NULL,
  "password" varchar(50) NOT NULL,
  "created_at" timestamp
);

CREATE TABLE "book" (
  "id" integer PRIMARY KEY,
  "isbn" varchar(20) NOT NULL,
  "title" varchar NOT NULL,
  "author" varchar(50) NOT NULL,
  "category" varchar(50),
  "summary" text,
  "coverUrl" varchar(50),
  "publication_date" date
);

ALTER TABLE "library" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "library" ADD FOREIGN KEY ("book_id") REFERENCES "book" ("id");
