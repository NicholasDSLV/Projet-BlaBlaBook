import request from 'supertest';
import app from '../index.js';
import sequelize from '../src/models/sequelize.client.js';

afterAll(async () => {
  await sequelize.close();
});


describe('GET /', () => {
  it('affiche la page d’accueil', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toContain('BLABLABOOK');
    expect(response.text).toContain('Notre sélection');
  });
});
