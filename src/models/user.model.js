import { Sequelize, Model, DataTypes } from 'sequelize';

import sequelize from './sequelize.client.js';

// Déclare une classe du modèle
class User extends Model {
}

User.init(
	{

		email: {
			// type string
			type: DataTypes.STRING(50),
			// null interdit
			allowNull: false,
            unique: true,
		},
		username: {
			// reference CHAR(9) UNIQUE NOT NULL,
			type: DataTypes.STRING(15),
			// null interdit
			allowNull: false,
            unique: true,
		},
		password: {
			// type string
			type: DataTypes.STRING(100),
			// null interdit
			allowNull: false,
		},
	},
	// modelName ==> nom de la table à créer
	{ sequelize, modelName: 'user' },
);


export default User;