import { join } from 'node:path';
import 'dotenv/config';
import express from 'express';
import session from "express-session";

import indexRouter from './src/routes/index.router.js';
import libraryRouter from './src/routes/library.router.js';
import bookRouter from './src/routes/book.router.js';
import authRouter from './src/routes/auth.router.js';

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
    cookie: { maxAge: 60000 },
  }),
);

app.use(authRouter);
app.use(indexRouter);
app.use(libraryRouter);
app.use(bookRouter);

const port = process.env.PORT || 3000;
const base_url = process.env.BASE_URL || 'http://localhost';
// * On démarre le serveur http
app.listen(port, () => {
    console.info(`Blablabook Listening on ${base_url}:${port}`);
});