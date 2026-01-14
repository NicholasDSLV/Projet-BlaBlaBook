
CREATE TABLE Avis (
  PRIMARY KEY (Reference),
  Reference   VARCHAR(42) NOT NULL,
  note        VARCHAR(42),
  commentaire VARCHAR(42),
  Reference_2 VARCHAR(42) NOT NULL,
  Reference_3 VARCHAR(42) NOT NULL
);

CREATE TABLE Livre (
  PRIMARY KEY (Reference),
  Reference           VARCHAR(42) NOT NULL,
  title               VARCHAR(42),
  auteur              VARCHAR(42),
  resume              VARCHAR(42),
  genre               VARCHAR(42),
  date_de_publication VARCHAR(42)
);

CREATE TABLE Possede (
  PRIMARY KEY (Reference_1, Reference_2),
  Reference_1 VARCHAR(42) NOT NULL,
  Reference_2 VARCHAR(42) NOT NULL
);

CREATE TABLE Utilisateur (
  PRIMARY KEY (Reference),
  Reference         VARCHAR(42) NOT NULL,
  email             VARCHAR(42),
  nom_d_utilisateur VARCHAR(42),
  mot_de_passe      VARCHAR(42),
  nom               VARCHAR(42),
  prenom            VARCHAR(42)
);

ALTER TABLE Avis ADD FOREIGN KEY (Reference_3) REFERENCES Utilisateur (Reference);
ALTER TABLE Avis ADD FOREIGN KEY (Reference_2) REFERENCES Livre (Reference);

ALTER TABLE Possede ADD FOREIGN KEY (Reference_2) REFERENCES Utilisateur (Reference);
ALTER TABLE Possede ADD FOREIGN KEY (Reference_1) REFERENCES Livre (Reference);

