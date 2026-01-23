 **_Sprint 0 – BlaBlaBook_**
==================================
## 1️⃣ Cahier des charges
Présentation du projet
----
Le projet BlaBlaBook est une application web dédiée à la gestion d’une bibliothèque personnelle. Il s’inscrit dans un cadre pédagogique et a pour objectif de valider le TP du titre Développeur Web et Web Mobile (DWWM).
Ce projet est porté par une association fictive de passionnés de lecture, souhaitant mettre à disposition un outil simple et efficace pour organiser, suivre et enrichir une collection de livres. L’application s’adresse à tous les profils de lecteurs, qu’ils soient occasionnels ou lecteurs confirmés, désireux de gérer leur bibliothèque de manière centralisée.
L’objectif principal de BlaBlaBook est de permettre aux utilisateurs de référencer leurs livres, de suivre leurs lectures et de mieux organiser leur collection personnelle, tout en proposant une expérience utilisateur accessible et intuitive.
Le développement de l’application est réalisé en équipe, en suivant une méthodologie agile basée sur des sprints. Le suivi de l’avancement, la répartition des tâches et la collaboration sont assurés à l’aide des outils proposés par GitHub, notamment via les GitHub Projects.

Besoins & objectifs
--
De nombreux lecteurs rencontrent des difficultés pour organiser et suivre leur collection de livres au quotidien. Il n’est pas toujours simple de savoir quels ouvrages on possède déjà, lesquels ont été lus ou sont encore en cours de lecture. Par ailleurs, les solutions permettant de découvrir de nouveaux livres ou d’échanger autour de la lecture restent souvent limitées.

Le projet BlaBlaBook a pour objectif de proposer une application web simple et accessible, permettant à chaque utilisateur de gérer sa bibliothèque personnelle. L’application offrira la possibilité d’ajouter des livres, de suivre leur état de lecture et de retirer des ouvrages de sa collection si nécessaire.

BlaBlaBook mettra également l’accent sur la découverte de nouveaux livres grâce à des fonctionnalités de recherche, ainsi qu’à une option de sélection aléatoire mettant en avant un « livre du jour ». Cette approche vise à encourager la curiosité et à renouveler l’intérêt pour la lecture.

À terme, le projet pourra évoluer vers des fonctionnalités plus sociales, telles que le partage d’avis et de notes, afin de créer davantage d’interactions entre les lecteurs.

### Fonctionnalités du projet :
-----

## MVP :

### Utilisateurs :

* Inscription : L’utilisateur peut créer un compte avec email + mot de passe.

* Connexion / Déconnexion : Accès sécurisé à son espace personnel via JWT.

* Profil basique : L’utilisateur peut voir son nom et sa bibliothèque personnelle.

### Gestion de bibliothèque

* Ajouter un livre : L’utilisateur peut ajouter un livre à sa bibliothèque (lu ou à lire).

* Supprimer un livre : Retirer un livre de sa bibliothèque personnelle.

* Lister ses livres : Voir tous les livres ajoutés dans sa bibliothèque.

### Livres

* Voir les détails d’un livre : Titre, auteur, description, couverture (image).

* Rechercher un livre : Par titre ou auteur.

* Liste aléatoire sur la page d’accueil : Affiche quelques livres .

### Back-end / API

* CRUD Livres : GET (liste et détails), POST (ajout), PATCH (modification), DELETE (suppression) via Express + Sequelize.

* CRUD Users : Gestion basique des utilisateurs pour inscription et connexion.

* Authentification express session : Protection des routes sensibles.

## Front-end

### Pages principales :

* Accueil (livres random)

* Inscription / Connexion

* Bibliothèque personnelle

* Détail d’un livre

* Navigation simple et responsive : Menu basique, compatible mobile et desktop.

* Templates dynamiques avec EJS : Intégration des données serveur côté HTML.

### Sécurité et bonnes pratiques

* Hash des mots de passe avec argon2.

* Validation des inputs pour éviter les injections SQL/XSS.

* Responsive / Mobile first et respect des normes WCAG.

* URLs propres et meta tags basiques pour SEO.

 ### Évolutions possibles :

* Notation et/ou avis

* Filtrage avancé (genre, note, date)

* Partage de bibliothèque

* Forum / chat en direct

## 2️⃣ Spécifications techniques

Back-end : NodeJS + Express ==> NodeJS permet de créer un serveur rapide et léger, Express simplifie la gestion des routes et des middlewares.

Base de données : PostgreSQL avec Sequelize ORM ==> PostgreSQL est une base relationnelle fiable ; Sequelize facilite les requêtes, les relations entre tables et les migrations.

Front-end : EJS ==> EJS permet de générer des pages HTML dynamiques côté serveur simplement, en intégrant facilement les données de l’API Express. Cela facilite le développement du MVP sans complexité SPA, tout en gardant une bonne cohérence avec NodeJS/Express et PostgreSQL.  

Authentification : express-session ==> Gère des sessions côté serveur via un cookie contenant un identifiant ; les données restent sur le serveur (mémoire/Redis), ce qui facilite la gestion des sessions, mais nécessite du stockage serveur.

Appels API : CRUD livres, users ==> Assure la séparation front/back, la sécurité des données et la possibilité d’évoluer facilement vers d’autres clients (mobile, etc.).

Sécurité : Hash mot de passe (argon2), protection XSS, validation inputs ==> Garantit la protection des données utilisateurs et la prévention des failles de sécurité courantes.

Responsive / Mobile first : Oui ==> Permet une utilisation sur tous types d’écrans et appareils, en suivant les bonnes pratiques .

Accessibilité : WCAG = W3C  Assure que l’application est utilisable par tous, y compris les personnes en situation de handicap (navigation clavier, contraste, lisibilité).


SEO : tags meta, urls friendly, titre , Attribut ALT des images ==> Optimise le référencement , facilite la lecture par les moteurs de recherche et améliore la visibilité du site, notamment pour les personnes atteintent de handicap.

Versionning : Git/GitHub ==> Permet de suivre l’historique des modifications, collaborer en équipe et gérer les branches de développement proprement.

## 3️⃣ Cible du projet

Lecteurs débutants ou confirmés

Tout âges

Intéressés par la gestion de leur bibliothèque et la découverte de livres

## 4️⃣ Navigateurs compatibles
###  Version au moment du commencement du projet :
* Chrome (Version 143.0.7499.170 (Build officiel) (64 bits))
* Firefox (Version 147.0 (64 bits))
* Edge (Version 143.0.3650.139 (Version officielle) (64 bits))
* Safari (Version 26.2 (21623.1.14.11.9))

## 5️⃣ Routes front

* " / "                 => Accueil
* " /login "            => Connexion
* " /register "         => Inscription
* " /library  "         => Ma bibliothèque
* " /books "            => Recherche/Liste des livres
* " /book/:id  "        => Détail d’un livre
* " /profil "          => Profil utilisateur

Schema arborescence des routes :
 
![arborescence](./conception/arborescence.svg)

### Tableau des EndPoints et code erreur :

| Verbe HTTP | URL          | Nom du routeur | Contrôleur & méthode        | Modèle & méthodes |Description|
|------------|--------------|----------------|-----------------------------|-------------------|-----------|
| GET        | /book       | book.router    | bookController.getAll       | Book.findAll      | Lister tous les livres|
| GET        | /book/:id   | book.router    | bookController.getById      | Book.findByPk     | Trouver un livre par id|

| Verbe HTTP | URL                 | Nom du routeur   | Contrôleur & méthode          | Modèle & méthodes |Description|
|------------|---------------------|------------------|-------------------------------|-------------------|-----------|
| GET        | /library            | library.router   | libraryController.getAll      | Library.findAll   | Acceder à la bibliothèque d'un utilisateur connecté|
| POST       | /library            | library.router   | libraryController.create      | Library.create   | Ajouter un livre à la bibliothèque d'un utilisateur connecté|
| PATCH      | /library/:id    | library.router   | libraryController.update      | Library.update   | Modifier le status d'un livre dans la bibliothèque de l'utilisateur connecté|
| DELETE     | /library/:id    | library.router   | libraryController.remove      | Library.delete   | Retirer un livre de le bibliothèque de l'utilisateur connecté|

| Verbe HTTP | URL             | Nom du routeur | Contrôleur & méthode        | Description                |
|------------|------------------|----------------|-----------------------------|----------------------------|
| POST       | /auth/register   | auth.router    | authController.registerUser | Création d'un compte utilisateur    |
| GET        | /auth/register   | auth.router    | authController.showRegister | Affiche du formulaire d'inscription |
| POST       | /auth/login      | auth.router    | authController.login        | Authentification de l'utilisateur (verification des identifiants) |
| GET        | /auth/login      | auth.router    | authController.showLogin    | Affiche du formulaire de connexion|
| GET        | /auth/profile    | auth.router    | authController.profile      | Affichage du profil de l'utilisateur connecté|
|DELETE      | /auth/profile    | auth.router    | authController.remove       | Supprimer utilisateur      |


| Code | Signification                        | Cas typique                              |
|------|--------------------------------------|------------------------------------------|
| `200`| OK                                   | Requête réussie (GET, PUT, PATCH)        |
| `201`| Created                              | Ressource créée (POST)                   |
| `204`| No Content                           | Suppression réussie (DELETE)             |
| `400`| Bad Request                          | Données manquantes ou invalides          |
| `401`| Unauthorized                         | Authentification requise                 |
| `403`| Forbidden                            | Accès refusé malgré l’authentification   |
| `404`| Not Found                            | Ressource introuvable                    |
| `409`| Conflict                             | Conflit lors de la création/modification |
| `500`| Internal Server Error                | Erreur serveur                           |


## 6️⃣ User Stories
| ID | En tant que… | Je veux… | Afin de… |
|:---|---------------|----------|----------|
1 | Visiteur | Consulter la liste des livres | Découvrir le contenu de la plateforme |
2 | Visiteur | Rechercher un livre par titre ou auteur | Trouver un livre qui m’intéresse |
3 | Visiteur | Voir les détails d’un livre | connaitre les details d'un livre |
4 | Visiteur | M’inscrire | Créer un compte pour accéder à mon espace personnel |
5 | Utilisateur | Me connecter | Accéder à mon espace personnel |
6 | Utilisateur | Ajouter un livre à ma bibliothèque | Suivre mes lectures |
7 | Utilisateur | Retirer un livre de ma bibliothèque | Mettre à jour ma bibliothèque |
8 | Utilisateur | Voir les détails d’un livre | Décider si je veux le lire |



Rôles
---

* Lead Développeur Front-end / git master // UI/UX Designer :
En charge du développement des composants front-end, de l’intégration des maquettes et de la gestion des appels aux API
======> Emmanuel Paparis

* Lead Développeur Back-end / git master // UI/UX Designer:
Responsable du développement des API Express, de la gestion de la base de données et de la mise en place de l’authentification.
======> Nicholas Da Silva

* Chef de projet / Scrum Master / git master // UI/UX Designer :
Responsable de l’organisation du projet, du suivi des sprints et de la coordination de l’équipe selon la méthodologie Scrum.
======> Yoann Schieritz

## 7️⃣ Base de données
![MCD](./conception/BDD/MCD.svg)
![MLD](./conception/BDD/MLD.svg)
![MPD](./conception/BDD/MPD.svg)
![MPD](./BDD/mpd.dbml)

Dictionnaire des données
|Table|	Champ|	Type|	Description|
|:----|------|------|:-----------|
|user| id|	integer|Identifiant unique|
|user| email|varchar|Adresse email|
|user| username|varchar|Pseudonyme de l'utilisateur
|user| password|varchar|Mot de passe hashé|
|user| created_at| timestamp|Date de creation du compte|
|user| updated_at| timestamp|Date de modification du compte|
|----|------|------|-----------|
|book| id| integer|Identifiant unique|
|book| isbn| varchar|Numéro international normalisé du livre|
|book| title|varchar|Titre du livre|
|book| author|varchar|Auteur du livre|
|book| category|varchar|Genre litéraire|
|book| summary|text|Résumé du livre|
|book| coverUrl|varchar|URL de l’image de couverture|
|book| publication_date|date|Date de publication|
|book| created_at|timestamp|Date d'ajout à la BDD|
|book| updated_at|timestamp|Date de mise à jour|
|----|------|------|-----------|
|library| id|integer|identifiant unique|
|library| user_id|integer|Utilisateur propriétaire|
|library| book_id|integer|Livre associé
|library |status|Enum|	“to-read”, “reading”, “read”|
|library | created_at|timestamp |Date de publication|
|library| updated_at|timestamp|Date de mise à jour|
|----|------|------|-----------|

## 8️⃣ Wireframes (simplifiés)
Page d’accueil :
* [Header: Logo + Menu]
* [head: Présentation BlaBlaBook]
* [Section livres random: 3 livres avec couverture + titre + résumé]
* [Footer: Mentions légales / Contact]

Page bibliothèque :
* [Header: Logo + Menu]
* [Listes livres ajoutés par user]
* [couverture | Titre | Auteur | Status | Boutons ] (modifier, retirer)
* [Ajouter un livre: barre de recherche + bouton]

Page détail livre :
* [Couverture] [Titre] [Auteur] [Année] [Résumé] [note]
* [Ajouter à ma bibliothèque / Modifier status]

Page login / register :
* [Formulaire email / password]
* [Bouton submit]
* [Link vers inscription / connexion]

## 9️⃣ Charte graphique.

### 1. Identité de marque
-----
* Nom : Blablabook
* Essence de marque : Partage, culture, conversation et lecture.
* Valeurs : Curiosité, convivialité, authenticité, ouverture d’esprit.
* Ton : Chaleureux, cultivé, accessible.

### 2. Logo
-----
Le logo Blablabook utilise une écriture élégante.



### 3 Couleur / Palette principale

| Nom | Code HEX | Utilisation |
|:---|:---------|:------------|
| Fond principal | #E3E9F2 | Couleur de fond de l’écran |
| Blanc pur | #FFFFFF | Header, footer et containers |
| gris clair | #DCE3EC | Bloc de présentation de la page d’accueil |
| Violet navigation | #6D67C9 | Boutons de navigation de la page d’accueil |
| Gris bleuté | #919FB3 | Bouton « Enregistrer » |
| Blanc | #FFFFFF | Texte du bouton « Enregistrer » |
| Bleu nuit | #1A1F2C | Bouton « Annuler » |
| Blanc | #FFFFFF | Texte du bouton « Annuler » |
| Violet connexion | #6A6ED4 | Bouton « Se connecter » (page connexion) |


### 4. Typographie

#### Police principale :
Cormorant Unicase 
* Utilisée pour le logo, les titres et les citations.
* Style : élégant, littéraire, avec empattements.


### 5. Conclusion
La charte graphique de Blablabook reflète une identité à la fois élégante et chaleureuse, liée à
l’univers du livre et au partage entre les personnes. Elle a pour but d’offrir une expérience visuelle
agréable sur tous les supports.
