import { User, Book } from "../models/index.js";

class BookController {
  getAll = async (req, res, next) => {
    try {
      const { author, category } = req.query;

      const where = {};
      if (author) where.author = author;
      if (category) where.category = category;

      const colors = {
        Conte: "tag-blue",
        Classique: "tag-yellow",
        Fantasy: "tag-green",
        "Science-fiction": "tag-purple",
      };

      const booksRaw = await Book.findAll({ where });

      const books = booksRaw.map((book) => {
        const b = book.toJSON(); // Sequelize -> objet JS
        b.tagClass = colors[b.category] || "tag-blue";
        return b;
      });

      res.render("pages/books", { books, author, category });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const bookRaw = await Book.findByPk(req.params.id);

      if (!bookRaw) return res.status(404).render("pages/404");

      const colors = {
        conte: "tag-blue",
        classique: "tag-yellow",
        fantasy: "tag-green",
        "Science-fiction": "tag-purple",
      };

      const book = bookRaw.toJSON();
      book.tagClass = colors[book.category] || "tag-blue";

      res.render("pages/book", { book });
    } catch (error) {
      next(error);
    }
  };
}

export default new BookController();



