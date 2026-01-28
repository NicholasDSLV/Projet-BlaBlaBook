import { Sequelize, Model, DataTypes } from 'sequelize';

import sequelize from './sequelize.client.js';

// Déclare une classe du modèle
class Library extends Model {
}

Library.init(
    {

        status: {
            // type string
            type: DataTypes.STRING(50),
            // null interdit
            allowNull: false,
            defaultValue: "à lire",
        },
    },
    // modelName ==> nom de la table à créer
    { sequelize, modelName: 'library' },
);


export default Library;