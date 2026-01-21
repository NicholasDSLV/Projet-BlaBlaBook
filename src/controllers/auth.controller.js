import { User, Book } from '../models/index.js'
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

class AuthController {
    // register = async (req, res, next) => {
    //}

    // login = async (req, res, next) => {

    //}

    profile = async (req, res, next) => {

        try {

            const dataJson = req.body;
            const user = await User.findOne({
                where: { username: dataJson.username }
            });
            if (!user) {
            // user n'existe pas => lance une nouvelle erreur 404
            return res.status(404).send('Utilisateur introuvable');
            }
            if (!(await argon2.verify(userFromBDD.password, dataJson.password))) {
            // Le mot de passe ne correspond pas !
            return res.status(401).send('login ou mot de passe incorrect');
            }
            // 4. Créer le token avec l'id de l'utilisateur
            // process.env.JWT_SECRET ==> va chercher le secret qui est dans .env
            //const token = jwt.sign(
            // Les données à mettre dans le token ==> PAYLOAD (charge utile)
            ////user_id: user.id
            //},
            // Le secret pour calculer le token
            //process.env.JWT_SECRET, // Le secret que j'ai découvert de l'API
            // Date d'expiration du token : le token expire dans une heure !
            //{
            //expiresIn: '1h'
            //}
            //);
            res.render("pages/profil", { user });
            } catch (error) {
			    next(error);
        }
    }
}
const myController = new AuthController();
export default myController;