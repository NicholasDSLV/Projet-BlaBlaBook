import { User, Book } from "../models/index.js";

class LibraryController {
  getAll = async (req, res, next) => {
    try {
      const userId = req.session.user.id;
      const user = await User.findByPk(userId, {
        include: [
          {
            model: Book,
            as: "books",
            through: {
              attributes: [],
            },
          },
        ],
      });
      if (!user) {
        // user n'existe pas => redirige vers la page login
        return res.redirect("/auth/login");
      }
      res.render("pages/library", {
        books: user.books,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const userId = req.session.user.id;
      const user = await User.findByPk(userId, {
        include: [
          {
            model: Book,
            as: "books",
            through: {
              attributes: [],
            },
          },
        ],
      });
      if (!user) {
        // user n'existe pas => redirige vers la page login
        return res.redirect("/auth/login");
      }
      // sans Number devant (req.body.articleId) c'est une string donc l'ajouter sinon .some() échoue
      const bookId = Number(req.body.articleId) // string
      const book = await Book.findByPk(bookId);
      if (!book) {
        return res.redirect("/");
      }
      const alreadyInLibrary = user.books.some(
        (book) => book.id === bookId  // number === string => false du coup ça bug (rajouter Number devant req.body.articleId)
      );                              // 3 === "3" --> false, donc alreadyInlibrary reste faux
      if (alreadyInLibrary){
        req.session.flash = {
        type: 'info',
        message: 'Ce livre est déjà dans votre bibliothèque',
        };
        return res.redirect('/library')
      }
      await user.addBook(bookId);
      await user.reload({
        include: [
          {
            model: Book,
            as: "books",
            through: {
              attributes: [],
            },
          },
        ],
      });

      req.session.flash = {
        type: "success",
        message: "Livre ajouté à la bibliothèque",
      };

      res.redirect("/library");
    } catch (error) {
      next(error);
    }
  };

  remove = async (req, res, next) => {
    try {
      // Recherche de le user avec sa bibliothèque de livres à partir de sa session
      const userId = req.session.user.id;
      let user = await User.findByPk(userId, {
        include: [
          {
            model: Book,
            as: "books",
            through: {
              attributes: [],
            },
          },
        ],
      });
      if (!user) {
        // Le user n'existe pas => lance une nouvelle erreur
        return res.redirect("/home");
      }

      // Recherche le book dans la BDD à partir du id book dans le input
      const book = await Book.findByPk(req.body.articleId);
      if (!book) {
        // Le book n'existe pas => lance une nouvelle erreur
        return res.redirect("/library");
      }

      // Supprime le book de la bibliothèque de livre
      await user.removeBook(req.body.articleId);

      req.session.flash = {
        type: "error",
        message: "Livre supprimé de la bibliothèque",
      };

      return res.redirect("/library");

      // "Refresh" de user pour récupérer le user avec tous ses books
      await user.reload({
        include: [
          {
            model: Book,
            as: "books",
            through: {
              attributes: [],
            },
          },
        ],
      });

      res.redirect("/library");
    } catch (error) {
      next(error);
    }
  };
}

const myController = new LibraryController();
export default myController;
