import Joi from 'joi';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import HttpError from '../utils/HttpError.js';

export function validateUser(req, res, next) {

	// Schema du JSON attendu
	const userSchema = Joi.object({
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']} }),
		username: Joi.string().alphanum().min(3).max(30).required(),
		password: Joi.string().min(20).max(30).required(),
		repeat_password: Joi.ref('password'),
	})

	const validation = userSchema.validate(req.body)

	if (validation.error) {
		// ERROR le JSON de la request n'est pas valide !
		// Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		// Equivalent de : return next(new HttpError(validation.error, 400));
		throw new HttpError("login ou mot de passe invalides", 400);
	}

	// Je ne suis pas rentré dans le IF, le body est valide donc j'appel le middleware suivant
	next();
}

export function validateToken(req, res, next) {

	// 1. chercher le token qui est dans l'entête HTTP de la requete
	// entete sous forme de clé / valeur ==> Authorization: "Bearer < token >"
	// Valeur attendue : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE3NjU5NjEzNzcsImV4cCI6MTc2NTk2NDk3N30.t9_Iare4Fh7CG59hpjHtSesnbAG1HzEFErAI5hNtdVo"
	const bearerToken = req.headers.authorization;

	// 2. Est-ce que bearerToken existe et commence par "Bearer "
	if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
		// Pas de authorization OU pas de bearer ==> lance une erreur 401 unauthorized qui sera attrapée par le errorHandler
		throw new HttpError("Authorization token missing or invalid", 401)
	}

	// 3. extraire le token de chaine de caractère
	// split découpe une string selon un séparateur et retourne un tableau de sous string
	// ici ça crée un tableau avec deux cases [Bearer] [eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpYXQiOjE3NjU5NjEzNzcsImV4cCI6MTc2NTk2NDk3N30.t9_Iare4Fh7CG59hpjHtSesnbAG1HzEFErAI5hNtdVo]
	// index 0 du tableau : "Bearer"
	// index 1 du tableau : le token 
	const token = bearerToken.split(" ")[1];

	// 4. Utiliser JWT pour vérifier le token. Doc : https://www.npmjs.com/package/jsonwebtoken
	jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {

		// Token invalide => il a été modifié par le client ou il est expiré, etc.
		if (err) {
			console.log(err)
			throw new HttpError("Authorization token missing or invalid", 401)
		}

		// token valide !
		// decoded contient les données du token :  {
		// 		"user_id": 1,
		//  	"iat": 1765961377,
		//		"exp": 1765964977
		//	}
		// 5. Ajouter dans la requete (req) une nouvelle constante "user_id" qui contient l'id de l'utilisateur
		// cet id est extrait des valeurs du token
		req.user_id = decoded.user_id;
	});

	// 5. passe au middleware suivante
	next();
}