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

export function validateLoginUser(req, res, next) {

	// Schema du JSON attendu
	const userSchema = Joi.object({
		email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net']} }),
		password: Joi.string().required(),
	})

	const validation = userSchema.validate(req.body)

	if (validation.error) {
		// ERROR le JSON de la request n'est pas valide !
		// Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		// Equivalent de : return next(new HttpError(validation.error, 400));
        req.session.flash = {
          type: 'error',
          message: 'Email ou mot de passe incorrect',
        };
		// Email ou mot de pass invalide on est redirigé vers la page login avec un message temporaire
		return res.redirect("/auth/login")
	}
	
	// Je ne suis pas rentré dans le IF, le body est valide donc j'appel le middleware suivant
	next();
};

export function validateUserUpdate(req, res, next) {

	// Schema du JSON attendu
	const userSchema = Joi.object({
		username: Joi.string().alphanum().min(3).max(30),
		email: Joi.string().email(),
  		currentPassword: Joi.string().min(20),
  		newPassword: Joi.string().min(20),
  		confirmPassword: Joi.string().valid(Joi.ref('newPassword')),
	})

    	// au moins un champ envoyé
    	.min(1)

    	// si newPassword → currentPassword obligatoire
    	.with('newPassword', 'currentPassword')

    	// si newPassword → confirmPassword obligatoire
    	.with('newPassword', 'confirmPassword');

	const validation = userSchema.validate(req.body)

	if (validation.error) {
		// ERROR le JSON de la request n'est pas valide !
		// Erreur => lance une nouvelle erreur, elle sera attrapée par le middleware de gestion des erreurs
		// Equivalent de : return next(new HttpError(validation.error, 400));
        req.session.flash = {
          type: 'error',
          message: 'Données du formulaire invalides',
        };
		// Donnée invalide on est redirigé vers la page profile avec un message temporaire
		return res.redirect("/auth/profile")
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