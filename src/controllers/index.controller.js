import { User, Book } from '../models/index.js'

class IndexController {
    showHome = async (req, res, next) => {

        try {

            const book = await Book.findAll({
                limit: 3
            });
            res.render("pages/home", { book });
            } catch (error) {
			    next(error);
        }
    }
}
const myController = new IndexController();
export default myController;