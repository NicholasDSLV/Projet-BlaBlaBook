import { Sequelize, Model, DataTypes } from 'sequelize';

// Doc Sequelize : https://sequelize.org/docs/v6/#quick-example

// Instance de Sequelize
import sequelize from './sequelize.client.js';

// Déclare une classe du modèle
class Book extends Model {
	// Contenu de la class : vide, comme dans la doc

}

// init : méthode static héritée de Model
// ** PHASE DE DESCRIPTION DU MODÈLE (classe ET table dans la BDD) **
Book.init(
	{
		// On s'adresse à Sequelize et lui dit :
		// Met dans la table Country une colonne name de type String

		// La colonne s'appelle name
		isbn: {
			// type string
			type: DataTypes.STRING(20),
			// null interdit
			allowNull: true,
		},
		title: {
			// reference CHAR(9) UNIQUE NOT NULL,
			type: DataTypes.STRING(255),
			// null interdit
			allowNull: false,
		},
		author: {
			// type string
			type: DataTypes.STRING(255),
			// null interdit
			allowNull: false,
		},
		category: {
			// type string
			type: DataTypes.STRING(100),
			// null interdit
			allowNull: true,
		},
		summary: {
			// type string
			type: DataTypes.TEXT,
			// null interdit
			allowNull: true,
		},
		coverUrl: {
			// type string
			type: DataTypes.TEXT,
			// null interdit
			allowNull: true,
		},
		publication_date: {
			// type string
			type: DataTypes.DATE,
			// null interdit
			allowNull: true,
		},
	},
	// modelName ==> nom de la table à créer
	{ sequelize, modelName: 'book' },
);


export default Book;
