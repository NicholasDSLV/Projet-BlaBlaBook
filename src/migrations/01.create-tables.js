// Modèles avec leurs associations
import * as Models from '../models/index.js';

// Instance de Sequelize
import sequelize from '../models/sequelize.client.js';

async function run() {

	try {

		// ** Reset de toute la BDD **
		await sequelize.sync({ force: true });

	} catch (error) {
		console.log('Error sync BDD', error);
	} finally {
		// Ferme la connexion à la BDD
		await sequelize.close();
	}

}

await run();