import Joi from 'joi';
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

export function loginMiddleware (req, res, next) {
  if (req.session?.user?.isAuthenticated) {
    return next();
  }
  res.redirect("/");
};