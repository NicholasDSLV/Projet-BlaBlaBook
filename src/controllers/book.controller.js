import { Book } from "../models/index.js";

class BookController {
  getAll = async (req, res, next) => {
    try {
      const { search = "", category = "", year = "", author = "" } = req.query;

      const where = {};

      // Recherche exacte par titre ou auteur
      if (search) {
        where.title = search;
      }

      if (author) {
        where.author = author;
      }

      // Filtre catégorie
      if (category) {
        where.category = category;
      }

      // Filtre année (exacte)
      if (year) {
        where.publication_date = year;
      }

      const books = await Book.findAll({ where });

      res.render("pages/books", {
        books,
        search,
        category,
        year,
        author,
      });
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
