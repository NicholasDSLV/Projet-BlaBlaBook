import 'dotenv/config';
import express from 'express';
import router from './router.js';

const app = express();

app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 blablabook app started at http://localhost:${PORT}`);
});