import { join } from 'node:path';
import 'dotenv/config';
import express from 'express';
import session from "express-session";
import sequelize from './src/models/sequelize.client.js';
import indexRouter from './src/routes/index.router.js';
import libraryRouter from './src/routes/library.router.js';
import bookRouter from './src/routes/book.router.js';
import authRouter from './src/routes/auth.router.js';
import contactRouter from "./src/routes/contact.router.js";
import legalsRouter from "./src/routes/legals.router.js";
import { localsUser } from './src/middlewares/locals.middleware.js';

// import xss sanitizer
import { xss } from 'express-xss-sanitizer';

const app = express();


app.set('views', join(import.meta.dirname, 'src/views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
// * statics : img, css, js etc
app.use(express.static(join(import.meta.dirname, 'public')));

// Protection contre les failles XSS
app.use(xss());

app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 jour = 24 heures × 60 minutes × 60 secondes × 1000 millisecondes
  }),
);


app.use(localsUser);
app.use(authRouter);
app.use(indexRouter);
app.use(libraryRouter);
app.use(bookRouter);
app.use(contactRouter);
app.use(legalsRouter);

const port = process.env.PORT || 4000;
const baseUrl = process.env.NODE_ENV === 'production' || 'http://localhost:4000' || 'https://projet-blablabook-xxx.onrender.com';

// Permet de synchroniser la BDD avec render lors du déploiement à faire uniquement si on a fais des modifs avec la BDD qu'on veux rajouter sur le site déployé.
// Ensuite il faut push en decommentant ce code puis repush en recommentant ce code sinon ça resync la BDD à chaque fois.
async function initDatabase() {
  try {
    console.log('⏳ Initialisation BDD…');

    await sequelize.authenticate();
    console.log('✅ Connexion BDD OK');

    await import('./src/migrations/01.create-tables.js');
    await import('./src/migrations/02.seed-tables.js');

    console.log('🎉 BDD initialisée');
  } catch (err) {
    console.error('❌ Erreur init BDD', err);
  }
}
await initDatabase();

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Blablabook Listening on ${port}`);
  });
}

export default app;
