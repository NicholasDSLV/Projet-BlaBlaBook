import { User, Book } from '../models/index.js'

class BookController {
    getAll = async (req, res, next) => {

        try {

            const books = await Book.findAll();
            res.render("pages/books", { books });
            } catch (error) {
			    next(error);
        }
    }

    getById = async (req, res, next) => {
        try {
            const book = await Book.findByPk(req.params.id,);
            res.render("pages/book", { book });
            } catch (error) {
			next(error);
        }
        }
    }
const myController = new BookController();
export default myController;