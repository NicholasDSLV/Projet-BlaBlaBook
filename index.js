import { join } from 'node:path';
import 'dotenv/config';
import express from 'express';
import session from "express-session";

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
const base_url = process.env.BASE_URL || 'http://localhost';

import sequelize from './models/sequelize.client.js';

async function initDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    // ⚠️ TEMPORAIRE : première mise en prod
    await import('./src/migrations/01.create-tables.js');
    await import('./src/migrations/02.seed-tables.js');

    console.log('Database initialized');
  } catch (err) {
    console.error('Database init failed', err);
  }
}

await initDatabase();

  app.listen(port, () => {
    console.log(`Blablabook Listening on ${port}`);
  });


export default app;
