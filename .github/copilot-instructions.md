# Instructions Copilot - BlaBlaBook

## Vue d'ensemble du projet

BlaBlaBook est une application web de gestion de bibliothèque personnelle développée en équipe avec méthodologie agile. Stack technique : **Node.js + Express + EJS + PostgreSQL/Sequelize**. Projet pédagogique DWWM avec architecture serveur-rendered (pas de SPA).

## Architecture & Structure

```
index.js                    # Point d'entrée Express, config EJS, statics
router.js                   # Router principal (non présent actuellement)
app/
  ├── controllers/          # Vide actuellement - à implémenter
  ├── routes/              
  │   └── bookRouter.js     # Pattern: import controller, Router(), export
  └── views/
      ├── pages/            # Pages complètes EJS
      └── partials/         # Composants réutilisables (head, foot)
integration/                # Maquettes HTML/CSS statiques de référence
conception/                 # Modèles de données, wireframes, arborescence
create_database.sql         # Schema PostgreSQL (tables: user, book, library)
```

## Conventions de code

**Module system**: ES Modules (`import`/`export`) - voir `"type": "module"` dans package.json

**Imports**: Toujours avec extension `.js` explicite
```javascript
import router from './router.js';
import { bookController } from '../controllers/appController.js';
```

**Déclarations**: Utiliser `const` par défaut (pattern observé dans la codebase)

**Routes**: Pattern standard - créer un Router, définir routes, exporter
```javascript
const bookRouter = Router();
bookRouter.get('/book', bookController.index);
export { bookRouter };
```

## Schéma de données

3 tables principales (voir [create_database.sql](../create_database.sql)):
- `user`: id, email, username, password (hash argon2), created_at
- `book`: id, isbn, title, author, category, summary, coverUrl, publication_date
- `library`: id, user_id, book_id, status (enum: "to-read", "reading", "read"), created_at

Relations: `library` fait le lien Many-to-Many entre `user` et `book` avec statut de lecture.

## API Routes (planifiées)

Voir [README.md](../README.md) lignes 146-163 pour la spec complète:
- `/books` - CRUD livres (bookController)
- `/library` - CRUD bibliothèque personnelle (libraryController)
- `/auth/*` - register, login, profile (authController + JWT)

Pattern naming: `controller.getAll`, `controller.getById`, `controller.create`, `controller.update`, `controller.remove`

## Frontend

**Templates EJS** dans `app/views/` - Server-side rendering, pas de framework JS côté client

**CSS**: Fichiers dans `integration/css/` (reset.css + style.css) - À intégrer via `public/`

**Pages prévues** (voir README User Stories):
- `/` - Accueil avec livres aléatoires
- `/login`, `/register` - Authentification
- `/library` - Bibliothèque personnelle de l'utilisateur
- `/books` - Recherche/Liste avec filtres
- `/book/:id` - Détail d'un livre

## Charte graphique

**Couleurs principales** (voir README section 9):
- Ocre doré: `#D89A1D` (titres, accents)
- Vert sauge: `#7BA48A` (éléments secondaires)
- Bleu pétrole: `#4A6E7E` (texte, boutons)
- Crème clair: `#F7F0E6` (fond principal)

**Typographie**: Playfair Display (titres) + Lato/Open Sans (texte courant)

## Développement

**Commandes**:
```bash
npm start          # Production (node index.js)
npm run dev        # Développement avec nodemon
```

**Variables d'environnement**: Fichier `.env` (template dans `.env.example`)
- `PORT` - Port serveur (défaut: 3000)
- Credentials DB PostgreSQL à configurer

**Point d'entrée**: Le serveur démarre sur `http://localhost:3000` (voir index.js ligne 16)

## Sécurité & Standards

- **Authentification**: JWT pour les sessions
- **Mots de passe**: Hasher avec argon2 (spécifié dans README)
- **Validation**: Inputs pour prévenir XSS/SQL injection
- **Accessibilité**: Respecter WCAG (navigation clavier, alt sur images, contraste)
- **Responsive**: Mobile-first approach
- **SEO**: Meta tags, URLs friendly, titres descriptifs

## État actuel du projet

⚠️ **En développement** - Structure de base mise en place:
- ✅ Serveur Express configuré
- ✅ Schema DB défini
- ✅ Maquettes HTML/CSS dans `integration/`
- ❌ Controllers vides - à implémenter
- ❌ Router principal manquant - créer `router.js` à la racine
- ❌ Connexion DB Sequelize à configurer
- ❌ Système d'auth JWT à développer

**Prochaines étapes**: Implémenter les controllers, configurer Sequelize, créer les modèles, intégrer l'authentification JWT.
