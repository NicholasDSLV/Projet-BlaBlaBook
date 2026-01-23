import HttpError from '../utils/HttpError.js';

// Middleware qui va vérifier si l'id dans l'URL est bien un entier
export function validateId(req, res, next) {

	// 1. Récupérer l'idList dans l'URL
	const id = Number(req.params.id);

	// 2. IF idList est un entier ET idlist supérieur à 0
	if (!Number.isInteger(id) && id <= 0) {
		// Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		// Equivalent de : return next(new HttpError('Id Invalid', 400));
		throw new HttpError('Id Invalid', 400);
	}
	// tout est OK : idList est un entier suppérier à zéro
	// next() : appelle le middleware suivant
	next();

}
// export const functinValidateId = validateId;

export function errorHandler(err, req, res, next) {

	// Copie la valeur de statusCode la classe HttpError 
	// || 500 ==> si il n'y a rien dans err.statusCode alors prend la valeur 500 (valeur par defaut)
	const statusCode = err.statusCode || 500;

	// Alternative
	// let statusCode = 500;
	// if (err.statusCode) {
	// 	statusCode = err.statusCode;
	// }

	// Ici message prend la valeur de err.message OU la string par défaut "Erreur interne du serveur" si err.message est null
	const errorMessage = err.message || "Erreur interne du serveur"

	// Envoyer une réposne HTTP "error" au client
	res.status(statusCode).json(
		{
			status: "error",
			code: statusCode,
			message: errorMessage
		}
	)
}