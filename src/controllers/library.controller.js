import { User, Book, Library } from "../models/index.js";
import { Op } from "sequelize";

class LibraryController {
  getAll = async (req, res, next) => {
    try {
      const userId = req.session.user.id;
      const search = req.query.search || "";
      const user = await User.findByPk(userId, {
        include: [
          {
            model: Book,
            as: "books",
            through: {
              // Sequelize n'injecte la table pivot que si tu la demandes explicitement, rajouter le status pour avoir les livres avec le status
              attributes: ["status"],
            },
            where: search
              ? {
                  [Op.or]: [
                    { title: { [Op.iLike]: `%${search}%` } },
                    { author: { [Op.iLike]: `%${search}%` } },
                  ],
                }
              : undefined,
          },
        ],
      });

      if (!user) {
        return res.redirect("/auth/login");
      }

      res.render("pages/library", {
        books: user.books,
        searchQuery: search,
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
              attributes: ["status"],
            },
          },
        ],
      });
      if (!user) {
        // user n'existe pas => redirige vers la page login
        return res.redirect("/auth/login");
      }
      // sans Number devant (req.body.articleId) c'est une string donc l'ajouter sinon .some() échoue
      const bookId = Number(req.body.articleId); // string
      const book = await Book.findByPk(bookId);
      if (!book) {
        return res.redirect("/");
      }
      // Reconnais qu'il y a 2 fois le même livre en bibliothèque
      const alreadyInLibrary = user.books.some(
        (book) => book.id === bookId, // number === string => false du coup ça bug (rajouter Number devant req.body.articleId)
      ); // 3 === "3" --> false, donc alreadyInlibrary reste faux
      if (alreadyInLibrary) {
        req.session.flash = {
          type: "error",
          message: "Ce livre est déjà dans votre bibliothèque",
        };
        return res.redirect("/library");
      }
      const status = req.body.status || "à lire";
      (await user.addBook(bookId),
        {
          through: { status },
        });
      await user.reload({
        include: [
          {
            model: Book,
            as: "books",
            through: {
              attributes: ["status"],
            },
          },
        ],
      });

      req.session.flash = {
        type: "success",
        message: "Livre ajouté à la bibliothèque",
      };
      // referer est un header HTTP envoyé par le navigateur, il dit : "je viens de cette page-là" et /search c'est le plan B ça veux dire : si le referer existe --> on y retourne sinon --> on redirige vers /
      const redirectTo = req.get("referer") || "/";
      res.redirect(redirectTo);
    } catch (error) {
      next(error);
    }
  };

  updateStatus = async (req, res, next) => {
    try {
      const userId = req.session.user.id;
      // articleId est le nom donné à l'input du form dans la vue EJS library, (donc l'id du livre, pas très parlant désolé)
      const { articleId, status } = req.body;

      await Library.update(
        { status },
        {
          where: {
            user_id: userId,
            book_id: articleId,
          },
        },
      );

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
        type: "success",
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
