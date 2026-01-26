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
  logout = async (req, res, next) => {
    try {
      req.session.destroy(() => {
      res.redirect("/");
      });
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

    login = async (req, res, next) => {
        try {
      // 1. récupérer le body de la requête
      const dataJson = req.body;
      // 2. Vérifier qu'il existe
      const userFromBDD = await User.findOne(
        {
          // WHERE username = dataJson.username
          where: { email: dataJson.email }
        }
      )
      if (!userFromBDD) {
        // result est null ! L'utilisateur n'existe pas dans la BDD
        req.session.flash = {
          type: 'error',
          message: 'Email ou mot de passe incorrect',
        };
        return res.redirect("/auth/login")
      }
      // 3. Vérifier si le mot de passe de l'utilisateur correspond au hash mis dans la BDD
      if (!(await argon2.verify(userFromBDD.password, dataJson.password))) {
      // Le mot de passe ne correspond pas !
        req.session.flash = {
          type: 'error',
          message: 'Mot de passe incorrect',
        }
        return res.redirect("/auth/login")
      }

      // 4. Créer la session
      req.session.user = {
      id: userFromBDD.id,
      email: userFromBDD.email,
      isAuthenticated: true,
      };
      console.log(req.session.user)
      // 5. Redirection vers la session du client
    res.redirect('/');
    } catch (error) {
      next(error);
    }
  }

  profile = async (req, res, next) => {
    try {
      const userId = req.session.user.id;
      const user = await User.findByPk(userId)
          res.render("pages/profil", {user});
        } catch (error) {
			  next(error);
        }
    }
  
  updateUser = async (req, res, next) => {
    try {
      const dataJson = req.body;
      const userId = req.session.user.id;
      await User.update(
        {
          username: dataJson.username,
          email: dataJson.email,
          password: dataJson.password
        },
        {
          where: { id: userId},
        }
        )
          res.redirect("pages/profil");
        } catch (error) {
			  next(error);
        }
    }
  }


const myController = new AuthController();
export default myController;


