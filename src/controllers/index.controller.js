import { User, Book } from "../models/index.js";

class IndexController {
    showHome = async (req, res, next) => {
        try {
            const books = await Book.findAll();             // récupère tout
            books.sort(() => Math.random() - 0.5);          // mélange
            const dailyBooks = books.slice(0, 3);           // garde 3

      res.render("pages/home", { books: dailyBooks }); // on garde "books" pour pas changer le EJS
    } catch (error) {
        next(error);
    }};
}

const myController = new IndexController();
export default myController;
