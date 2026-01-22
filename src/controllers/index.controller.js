import { User, Book } from '../models/index.js'

class IndexController {
    showHome = async (req, res, next) => {

        try {

            const books = await Book.findAll({
                limit: 3
            });
            console.log(books)
            res.render("pages/home", { books });
            } catch (error) {
			    next(error);
        }
    }
}
const myController = new IndexController();
export default myController;