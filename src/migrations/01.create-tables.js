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
	// Script --> ouvre --> ferme (seulement en dev)
    // Serveur --> ouvre --> ne ferme jamais(sauf shutdown) donc à commenter lors du create et seed db pour le déploiement ( à faire 1 seul fois lors du déploiement pour insérer les données une première fois puis commit/push)
    //ensuite retirer la fonction create/seed et re commit/push et redéployer auto
	//quand je dit à commenter je parle du finally ici !!
	}
}

await run();
