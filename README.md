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

* Notation et avis

* Filtrage avancé (genre, note, date)

* Partage de bibliothèque

* Forum / chat en direct

## 2️⃣ Spécifications techniques

Back-end : NodeJS + Express

Base de données : Postgres (justification : schéma flexible pour livres et utilisateurs)

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
* " /search  "          => Recherche
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

Front-end dev : composants React, appels API, maquettes

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
|Users|	id|	ObjectId|Identifiant unique|
|Users| email|String|Adresse email|
|Users|	password|String|Mot de passe hashé|
|Books|	title|	String	|Titre du livre|
|Books|	author	|String|	Auteur du livre|
|Books|	summary	|String	|Résumé du livre|
|Books|	coverUrl	|String	|URL de l’image de couverture|
|Library	|status	|Enum|	“to-read”, “reading”, “read”|
|Reviews	|rating|	Number|	Note sur 5|
|Reviews	|comment|	String	|Commentaire utilisateur|


## 8️⃣ Wireframes (simplifiés)
Page d’accueil
[Header: Logo + Menu]
[Hero: Présentation BlaBlaBook]
[Section livres random: 6 livres avec couverture + titre]
[Footer: Mentions légales / Contact]

Page bibliothèque
[Listes livres ajoutés par user]
- Titre | Auteur | Status | Boutons (modifier, retirer)
[Ajouter un livre: barre de recherche + bouton]

Page détail livre
[Couverture] [Titre] [Auteur] [Résumé]
[Ajouter à ma bibliothèque / Modifier status]

Page login / register
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

Cards livres : image + titre + auteur + statut

