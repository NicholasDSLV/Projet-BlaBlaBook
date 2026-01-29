import { User, Book } from "../models/index.js";
import { Op } from "sequelize";

const TAG_CLASS_BY_CATEGORY = {
  // Fiction (tag-blue)
  fiction: "tag-blue",
  "comics & graphic novels": "tag-blue",

  // Jeunesse (tag-green)
  // ⚠️ (petite coquille chez toi : "juvenile iction" => "juvenile fiction")
  "juvenile fiction": "tag-green",
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
  return (category || "unknown").trim().toLowerCase();
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

      // Recherche (partielle) titre / auteur
      if (search) {
        where[Op.or] = [
          { title: { [Op.iLike]: `%${search}%` } },
          { author: { [Op.iLike]: `%${search}%` } },
        ];
      }

      // 1) On récupère les livres (filtrés)
      const booksRaw = await Book.findAll({ where });

      // 2) Si user connecté : on récupère UNE FOIS les ids des livres de sa bibliothèque
      let libraryBookIds = new Set();
      const userId = req.session?.user?.id;

      if (userId) {
        const user = await User.findByPk(userId);

        if (user) {
          const userBooks = await user.getBooks({
            attributes: ["id"],
            joinTableAttributes: [], // évite de ramener les champs de la table pivot
          });

          libraryBookIds = new Set(userBooks.map((b) => b.id));
        }
      }

      // 3) On enrichit chaque livre avec tagClass + isInLibrary
      const books = booksRaw.map((book) => {
        const b = book.toJSON();
        b.tagClass = getTagClass(b.category);
        b.isInLibrary = libraryBookIds.has(b.id);
        return b;
      });

      res.render("pages/books", {
        books,
        author,
        category,
        searchQuery: search || "",
      });
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

      // Ajout : est-ce que ce livre est dans la bibliothèque du user ?
      book.isInLibrary = false;

      const userId = req.session?.user?.id;
      if (userId) {
        const user = await User.findByPk(userId);
        if (user) {
          book.isInLibrary = await user.hasBook(bookRaw); // relation N-N (through 'library')
        }
      }

      res.render("pages/book", { book });
    } catch (error) {
      next(error);
    }
  };
}

export default new BookController();
