import { User, Book } from "../models/index.js";
import { Op } from "sequelize";


const TAG_CLASS_BY_CATEGORY = {
  // Fiction
  fiction: "tag-blue",
  "juvenile fiction": "tag-green",
  juvenile: "tag-green",
  "juvenile fict": "tag-green",

  // Tech
  computers: "tag-purple",
  programming: "tag-purple",

  // Jeunesse / famille
  children: "tag-green",
  "family & relationships": "tag-green",

  // Science
  science: "tag-yellow",
  Business: "tag-yellow",

  // Littérature
  "literary collections": "tag-pink",

  // Philosophie
  philosophy: "tag-purple",
  art: "tag-purple",

  // unknown
  unknown: "tag-red",
};

function normalizeCategory(category) {
  return (category || "unknown")
    .trim()
    .toLowerCase();
}

function getTagClass(category) {
  return TAG_CLASS_BY_CATEGORY[normalizeCategory(category)] || "tag-blue";
}


class BookController {
  getAll = async (req, res, next) => {
    try {
      const { author, category, search } = req.query;

    

      const where = {};
      if (author) where.author = author;
      if (category) where.category = category;
      // AJOUTEZ LA RECHERCHE ICI
      if (search) {
        where[Op.or] = [
          { title: { [Op.iLike]: `%${search}%` } },
          { author: { [Op.iLike]: `%${search}%` } }
        ];
      }
      

      const booksRaw = await Book.findAll({ where });

      const books = booksRaw.map((book) => {
      const b = book.toJSON();
      b.tagClass = getTagClass(b.category);
      return b;
    });

      res.render("pages/books", { books, author, category, searchQuery: search || '' });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const bookRaw = await Book.findByPk(req.params.id);

      if (!bookRaw) return res.status(404).render("pages/404");



      const book = bookRaw.toJSON();
      book.tagClass = getTagClass(book.category);

      res.render("pages/book", { book });
    } catch (error) {
      next(error);
    }
  };

  
}

export default new BookController();
