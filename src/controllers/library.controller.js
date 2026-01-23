import { User, Book } from '../models/index.js'

class LibraryController {
    getAll = async (req, res, next) => {

        try {

            const userId = 1; // temporaire
            const user = await User.findByPk(userId,
                {
                    include: [
                        {
                            model: Book,
                            as: 'books',
                            through: {
                                attributes: []
                            }
                        }
                    ]
                }
            );
            if (!user) {
            // user n'existe pas => lance une nouvelle erreur 404
            return res.status(404).send('Utilisateur introuvable');
            }
            console.log(user.books);
            res.render('pages/library', { 
                user, 
                books: user.books });
            } catch (error) {
			    next(error);
        }
    }
}



const myController = new LibraryController();
export default myController;