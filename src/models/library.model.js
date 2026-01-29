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
  {
    sequelize,
    tableName: "library",
    // tableName = tu branche l'appareil(nom de la table, la prise est deja la on dit juste comment l'utiliser vue que la table a déja été créer grace  à l'association N-N dans le model index js)
  }
);


export default Library;