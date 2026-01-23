import { User, Book } from "../models/index.js";

class BookController {
  getAll = async (req, res, next) => {
    try {
      const { author } = req.query;

      const where = {};
      if (author) {
        where.author = author; // filtre exact
      }

      const books = await Book.findAll({ where });

      res.render("pages/books", { books, author });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const book = await Book.findByPk(req.params.id);
      res.render("pages/book", { book });
    } catch (error) {
      next(error);
    }
  };
}

export default new BookController();
