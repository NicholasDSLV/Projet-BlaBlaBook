 **_Sprint 0 – BlaBlaBook_**
==================================
## 1️⃣ Cahier des charges
Présentation du projet
----

* Nom : BlaBlaBook

* Type de projet : Application web de gestion de bibliothèque personnelle

* Qui : Association fictive de passionnés de lecture

* Pour qui : Tous les lecteurs (novices ou confirmés)

* Pourquoi : Projet pédagogique pour valider le TP DWWM

* Comment : Développement en équipe avec méthode agile (sprints), suivi des tâches via GitHub (gitHub project)

Besoins & objectifs
--
Problèmes identifiés :

* Difficulté à gérer sa collection de livres

* Peu de moyens pour découvrir de nouveaux livres

* Manque d’interactions autour de la lecture

 Objectifs / solutions :

* Gestion de bibliothèque personnelle (ajout, lecture, retrait)

* Recherche et découverte de livres

* Ajout d'une fonction random(book of the day)

* Possibilité de partager des avis et notes (évolutions futures)

 
Fonctionnalités du projet :
-----

MVP :

* Page d’accueil avec présentation et livres “random”

* Système d’inscription et de connexion

* Gestion de bibliothèque personnelle (ajout, lecture, retrait des livres)

* Moteur de recherche

* Page détail d’un livre

 Évolutions possibles :

* Notation et/ou avis

* Filtrage avancé (genre, note, date)

* Partage de bibliothèque

* Forum / chat en direct

## 2️⃣ Spécifications techniques

Back-end : NodeJS + Express

Base de données : PostgreSQL avec Sequelize ORM (justification : base relationnelle assurant l’intégrité des données et la gestion des relations entre utilisateurs et livres).

Front-end : Svelte 

Authentification : JWT (Json Web Token)

Appels API : CRUD livres, users 

Sécurité : Hash mot de passe (argon2), protection XSS, validation inputs

Responsive / Mobile first : Oui

Accessibilité : WCAG = W3C  L’application respecte les recommandations WCAG afin de garantir l’accessibilité du contenu à tous les utilisateurs, y compris les personnes en situation de handicap, en assurant une navigation claire, lisible et utilisable au clavier ou via des technologies d’assistance.


SEO : tags meta, urls friendly, titre , Attribut ALT des images

Versionning : Git/GitHub

## 3️⃣ Cible du projet

Lecteurs débutants ou confirmés

Tout âges

Intéressés par la gestion de leur bibliothèque et la découverte de livres

## 4️⃣ Navigateurs compatibles

Chrome, Firefox, Edge, Safari (dernières versions)

## 5️⃣ routes front

* " / "                 => Accueil
* " /login "            => Connexion
* " /register "         => Inscription
* " /library  "         => Ma bibliothèque
* " /book/:id  "        => Détail d’un livre
* " /profile "          => Profil utilisateur



## 6️⃣ User Stories
| ID |	En tant que… |	Je veux… |	Afin de…|
|:----|---------------|:-----------|:---------------
1|	Utilisateur	|M’inscrire	|Créer mon compte pour accéder à mon espace personnel|
2|	Utilisateur	|Me connecter|	Accéder à mon espace personnel
3|	Utilisateur	|Ajouter un livre à ma bibliothèque	|Suivre mes lectures
4|	Utilisateur	|Retirer un livre	|Mettre à jour ma bibliothèque
5|	Utilisateur	|Voir les détails d’un livre	|Décider si je veux le lire
6|	Utilisateur	|Rechercher un livre par titre ou auteur|	Découvrir de nouveaux livres |
7| Utilisateur | Laisser un avis/ une note |



Rôles
---

Front-end dev : conception et développement des composants Svelte, appels API, maquettes

Back-end dev : API Express, base de données, authentification

Designer / UI : wireframes, charte graphique

Chef de projet / Scrum master : suivi sprint, coordination équipe

## 7️⃣ Base de données
MCD (Modèle Conceptuel de Données)
User ---< Bibliothèque >--- Book
Book ---< Avis

MLD (Modèle Logique de Données)

Users : id, email, passwordHash, createdAt, role

Books : id, title, author, summary,  genre, status (to-read, reading, read), publishedAt

Library : id, userId, bookId, , addedAt

Reviews (évolution) : id, userId, bookId, rating, comment, createdAt

Dictionnaire des données
|Table|	Champ|	Type|	Description|
|:----|------|------|:-----------|
|user| id|	integer|Identifiant unique|
|user| email|varchar|Adresse email|
|user| username|varchar|Pseudonyme de l'utilisateur
|user| password|varchar|Mot de passe hashé|
|user| first_name|varchar|Prénom de l'utilisateur|
|user| last_name|varchar|Nom de l'utilisateur|
|user| created_at| timestamp|Date de creation du compte|
|book| id| integer|Identifiant unique|
|book| title|varchar|Titre du livre|
|book| author|varchar|Auteur du livre|
|book| category|varchar|Genre litéraire|
|book| summary|text|Résumé du livre|
|book| coverUrl|varchar|URL de l’image de couverture|
|book| publication_date|date|Date de publication|
|library| id|integer|identifiant unique|
|library| user_id|integer|Utilisateur propriétaire|
|library| book_id|integer|Livre associé
|library |status|Enum|	“to-read”, “reading”, “read”|
|library |created_at|timestamp |date de publication|
|notice|id|integer|Identifiant de l’avis
|notice	|rating|	integer|	Note sur 5|
|notice	|comment|	text	|Commentaire utilisateur|
|notice |user_id | integer | Auteur de l’avis
|notice | book_id | integer|Livre concerné
|notice |created_at|TIMESTAMP|Date de publication de l’avis

## 8️⃣ Wireframes (simplifiés)
Page d’accueil :
[Header: Logo + Menu]
[head: Présentation BlaBlaBook]
[Section livres random: 3 livres avec couverture + titre + résumé]
[Footer: Mentions légales / Contact]

Page bibliothèque :
[Header: Logo + Menu]
[Listes livres ajoutés par user]
- couverture |Titre | Auteur | Status | Boutons (modifier, retirer)
[Ajouter un livre: barre de recherche + bouton]

Page détail livre :
[Couverture] [Titre] [Auteur] [Année] [Résumé] [note]
[Ajouter à ma bibliothèque / Modifier status]

Page login / register :
[Formulaire email / password]
[Bouton submit]
[Link vers inscription / connexion]

## 9️⃣ Charte graphique de base

Palette :

Couleur primaire : #1E3A8A (bleu foncé)

Couleur secondaire : #FBBF24 (jaune)

Couleur accent : #EF4444 (rouge)

Fond : #F9FAFB (gris clair)

Typographie : Montserrat pour titres, Open Sans pour textes

Boutons : coins arrondis, hover avec légère ombre

Cards livres : image + titre + résumé + statut

