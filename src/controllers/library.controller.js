import { User, Book } from '../models/index.js'

class LibraryController {
    getAll = async (req, res, next) => {

        try {
            const userId = req.session.user.id;
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
            // user n'existe pas => redirige vers la page login
            return res.redirect('/auth/login');
            }
            res.render('pages/library', { 
                books: user.books });
            } catch (error) {
			    next(error);
        }
    }

    create = async (req, res, next) => {
        try {
            const userId = req.session.user.id;
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
            // user n'existe pas => redirige vers la page login
                return res.redirect('/auth/login');
            }
            const book = await Book.findByPk(req.body.articleId);
            if (!book) {
            return res.redirect('/');
            }
            await user.addBook(req.body.articleId);
            await user.reload(
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
            res.render('pages/library', { 
                books: user.books });
            } catch (error) {
			    next(error);
        }
}
}



const myController = new LibraryController();
export default myController;