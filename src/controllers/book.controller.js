import { User, Book } from "../models/index.js";
import { Op } from "sequelize";


const TAG_CLASS_BY_CATEGORY = {
  // Fiction (tag-blue)
  fiction: "tag-blue",
  "comics & graphic novels": "tag-blue", // reste de la fiction / récit

  // Jeunesse (tag-green)
  "juvenile iction": "tag-green",
  "juvenile nonfiction": "tag-green",
  "young adult fiction": "tag-green",

  // Tech / “discipline” 
  psychology: "tag-purple",
  "business & economics": "tag-purple",
  "language arts & disciplines": "tag-purple",

  // Science / sciences humaines 
  "social science": "tag-yellow",

  // Littérature / critique 
  "literary collections": "tag-pink",
  "literary criticism": "tag-pink",

  // Arts / loisirs 
  art: "tag-pink",
  "performing arts": "tag-pink",
  "games & activities": "tag-pink",

  // Histoire 
  history: "tag-yellow",

  // Fallback 
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
