// require : equivalent de import, mais fourni par Node.js
// const { Sequelize } = require('sequelize');

// import : code natif JS
// require "à l'ancienne" de sequelize
import { Sequelize } from 'sequelize';


// import dotenv pour lire le fichier .env
import 'dotenv/config';

// On récupère la string DATABASE_URL écrite dans le .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
	// define configure le comportement par défaut de Sequelize
	define: {
		// Une convention pour que Sequelize ne mette pas les noms de table au pluriel
		freezeTableName: true,
		// Ajoute les colonnes createdAt et updatedAt à chaque table
		timestamps: true,
		// Utilise le snake_case pour les champs auto-générés (createdAt -> created_at)
		underscored: true,
	},
});

try {
	await sequelize.authenticate();
	console.log('Connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}

export default sequelize; 