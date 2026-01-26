import HttpError from "../utils/HttpError.js";
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
	const message = err.message || "Erreur interne du serveur"

	// Envoyer une réposne HTTP "error" au client
	res.render("error", {
		statusCode,
		message,
	});
}