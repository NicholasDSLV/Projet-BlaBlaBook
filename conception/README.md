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

* Authentification JWT : Protection des routes sensibles.

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

Authentification : JWT (Json Web Token) ==> Permet une gestion sécurisée des sessions sans stocker les informations sensibles côté client.

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
* " /profile "          => Profil utilisateur

### Tableau des EndPoints :

| Verbe HTTP | URL          | Nom du routeur | Contrôleur & méthode        | Modèle & méthodes |
|------------|--------------|----------------|-----------------------------|-------------------|
| GET        | /books       | book.router    | bookController.getAll       | Book.findAll      |
| GET        | /books/:id   | book.router    | bookController.getById      | Book.findByPk     |
| POST       | /books       | book.router    | bookController.create       | Book.create       |
| PATCH      | /books/:id   | book.router    | bookController.update       | Book.update       |
| DELETE     | /books/:id   | book.router    | bookController.remove       | Book.delete       |

| Verbe HTTP | URL                 | Nom du routeur   | Contrôleur & méthode          | Modèle & méthodes |
|------------|---------------------|------------------|-------------------------------|-------------------|
| GET        | /library            | library.router   | libraryController.getAll      | Library.findAll   |
| POST       | /library            | library.router   | libraryController.create      | Library.create   |
| PATCH      | /library/:id    | library.router   | libraryController.update      | Library.update   |
| DELETE     | /library/:id    | library.router   | libraryController.remove      | Library.delete   |

| Verbe HTTP | URL             | Nom du routeur | Contrôleur & méthode        | Description                |
|------------|------------------|----------------|-----------------------------|----------------------------|
| POST       | /auth/register   | auth.router    | authController.register     | Inscription utilisateur    |
| POST       | /auth/login      | auth.router    | authController.login        | Connexion utilisateur      |
| GET        | /auth/profile    | auth.router    | authController.profile      | Profil utilisateur connecté|





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

* Développeur Front-end (Svelte) :
En charge du développement des composants front-end, de l’intégration des maquettes et de la gestion des appels aux API
======> Emmanuel Paparis

* Développeur Back-end :
Responsable du développement des API Express, de la gestion de la base de données et de la mise en place de l’authentification.
======> Nicholas Da Silva

* UI/UX Designer :
Chargé de la conception des wireframes, de la définition de la charte graphique et de l’amélioration de l’expérience utilisateur.
======> Morgan Leotet

* Chef de projet / Scrum Master :
Responsable de l’organisation du projet, du suivi des sprints et de la coordination de l’équipe selon la méthodologie Scrum.
======> Yoann Schieritz

## 7️⃣ Base de données
![MCD](./BDD/MCD.svg)
![MLD](./BDD/MLD.svg)
![MPD](./BDD/MPD.svg)
[MPD](./BDD/mpd.dbml)

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
Le logo Blablabook utilise une écriture élégante, avec un mélange de couleurs chaudes et froides
pour représenter la diversité et l’échange entre les personnes.
Versions autorisées
* Version principale : Logo en dégradé du jaune ocre vers le bleu-vert.
* Version monochrome : Noir ou blanc selon le fond.
* Version fond clair : Utiliser la version couleur originale.
* Version fond foncé : Utiliser la version blanche.
* Marges de sécurité :
Laisser un espace équivalent à la hauteur du « B » autour du logo pour garantir sa lisibilité.
* Taille minimale :
Ne pas utiliser le logo en dessous de 2 cm de largeur pour éviter toute perte de lisibilité.
### 3. Couleurs
Palette principale :
|Nom| Code HEX| Utilisation|
|:--|:--------|:-----------|
|Ocre doré| #D89A1D |Accent, titres, éléments chaleureux
|Vert sauge| #7BA48A | Éléments secondaires, fonds doux
|Bleu pétrole| #4A6E7E |Texte, boutons, contrastes
|Crème clair| #F7F0E6 | Fond principal|

Palette secondaire :

|Nom| Code HEX |Utilisation|
|:--|:---------|:----------|
|Gris doux| #E0DED9 |Arrière-plans neutres|
Bleu clair| #A3C1C9 |Survols, détails graphiques|

### 4. Typographie
#### Police principale :
Playfair Display 
* Utilisée pour le logo, les titres et les citations.
* Style : élégant, littéraire, avec empattements.
#### Police secondaire :
Lato ou Open Sans
* Utilisée pour les textes courants et interfaces numériques.
* Style : moderne, lisible, sans empattement.
### 5. Iconographie et visuels
* Style : Illustrations douces, textures papier, ambiances chaleureuses.
* Photographies : Scènes de lecture, échanges, cafés, bibliothèques.
* Filtres : Tons chauds et naturels, lumière douce.

### 6. Utilisation digitale
* Boutons : Fond bleu pétrole (#4A6E7E), texte blanc.
* Liens : Texte ocre doré (#D89A1D), survol en vert sauge (#7BA48A).
* Fonds : Crème clair (#F7F0E6) pour une lecture confortable.
### 7. Papeterie et supports
* Cartes de visite : Logo centré, fond crème, texte bleu pétrole.
* En-têtes : Logo en haut à gauche, typographie Playfair Display.
* Présentations : Utiliser la palette principale et des visuels cohérents.

### 8. Interdits
* Ne pas modifier les couleurs du logo.
* Ne pas étirer ou déformer le logo.
* Ne pas ajouter d’effets (ombres, contours, dégradés supplémentaires).
* Ne pas placer le logo sur un fond trop chargé.
### 10. Conclusion
La charte graphique de Blablabook reflète une identité à la fois élégante et chaleureuse, liée à
l’univers du livre et au partage entre les personnes. Elle a pour but d’offrir une expérience visuelle
agréable et cohérente sur tous les supports.
