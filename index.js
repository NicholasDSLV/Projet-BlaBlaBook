import { join } from 'node:path';
import 'dotenv/config';
import express from 'express';
import router from './router.js';

const app = express();
app.set('views', join(import.meta.dirname, 'app/views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
// * statics : img, css, js etc
app.use(express.static(join(import.meta.dirname, 'public')));

app.use(router);

const port = process.env.PORT || 3000;
const base_url = process.env.BASE_URL || 'http://localhost';
// * On démarre le serveur http
app.listen(port, () => {
    console.info(`Blablabook Listening on ${base_url}:${port}`);
});