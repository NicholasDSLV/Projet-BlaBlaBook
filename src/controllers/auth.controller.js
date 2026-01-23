import { User, Book } from '../models/index.js'
import HttpError from '../utils/HttpError.js';
import argon2 from 'argon2';
import 'dotenv/config';

class AuthController {
    showRegister = async (req, res, next) => {
    try {
      res.render("pages/register");
    } catch (error) {
      next(error);
    }
    }

    showlogin = async (req, res, next) => {
        try {
      res.render("pages/login");
    } catch (error) {
      next(error);
    }
    }

    registerUser = async (req, res, next) => {
        try {
        // 1. récupérer le body de la requête
        // Dans le body j'attends les données du nouvel utilisateur à enregsitrer
      const dataJson = req.body;

      // 2 Vérifier si le nom de l'utilisateur existe déjà dans la BDD
      // Si oui, refuser l'enregistrement et renvoyer une erreur 409
      // Rechercher dans la BDD un utilsateur par son username
      // SELECT * FROM user ... WHERE blabla 
      const result = await User.findOne(
        {
          // WHERE username = dataJson.username
          where: { username: dataJson.username }
        }
      )
      if (result) {
        // result n'est pas null ! J'ai déjà un utilisateur avec ce username dans la BDD
        throw new HttpError('Username already exists', 409);
      }

      // 3. Calculer le hash du mot de passe
      const hash = await argon2.hash(dataJson.password);

      // 4. Enregistrer le nouvel utilisateur dans la BDD avec le hash du mdp
      const newUser = await User.create(
        {
          email: dataJson.email,
          username: dataJson.username,
          password: hash,
        }
      );

      // 5. Si l'enregistrement a échoué ==> renvoyer une erreur 500
      // newUser est null ==> l'ajout de l'utilisateur a échoué
      if (!newUser) {
        const errorNotFound = new HttpError(`Aucun utilisateur créé`, 500);
        // J'ai créé une nouvelle erreur, je vais la lancer pour qu'elle soit attrapée par le catch
        // toutes les instruction après le throw ne seront pas exécutées
        throw errorNotFound;
      }

      // 6. Si l'enregistrement a réussi ==> renvoyer l'utilisateur vers la page login
    res.redirect('/auth/login');

    } catch (error) {
      next(error);
        }
    }

    profile = async (req, res, next) => {
        try {
            res.render("pages/profil");
            } catch (error) {
			    next(error);
        }
    }

    login = async (req, res, next) => {
        try {
      // 1. récupérer le body de la requête
      // Dans le body j'attends les données du nouvel utilisateur à enregistrer
      // dataJson = { username: "....", password: "....." }
      const dataJson = req.body;
      console.log(
      "l'utilisateur qui vient de remplir le formulaire est :",
      dataJson,
      );
      // 2. Chercher le user selon son nom
      // SELECT * FROM user ... WHERE username = dataJson.username
      const userFromBDD = await User.findOne(
        {
          // WHERE username = dataJson.username
          where: { email: dataJson.email }
        }
      )
      req.session.user = {
      userFromBDD,
      isAuthenticated: true,
      };

      if (!userFromBDD) {
        // result est null ! L'utilisateur n'existe pas dans la BDD
        throw new HttpError('login ou mot de passe incorrect', 401);
      }
      // 3. Vérifier si le mot de passe de l'utilisateur correspond au hash mis dans la BDD
      if (!(await argon2.verify(userFromBDD.password, dataJson.password))) {
        // Le mot de passe ne correspond pas !
        throw new HttpError('login ou mot de passe incorrect', 401);
      }
      // 5. Redirection vers la session du client
      res.redirect('/');

    } catch (error) {
      next(error);
    }
  }
}
const myController = new AuthController();
export default myController;


