import sequelize from "../models/sequelize.client.js";
import argon2 from "argon2";
import { User, Book } from "../models/index.js";
import data from "./data-examples.json" with { type: "json" };

async function seed() {
  console.log("Syncing database...");
  try {
    const users = data.users;
    for (let user of users) {
      const hash = await argon2.hash(user.password);
      await User.create({
        email: user.email,
        username: user.username,
        password: hash,
      });
    }
    console.log("Users seeded");

    // =====================
    // 2. BOOKS (Google API)
    // =====================
      const queries = [
        'harry potter',
        'le seigneur des anneaux',
        'game of thrones',
        'the witcher'
      ];




    function pickIsbn(volumeInfo) {
  const ids = volumeInfo.industryIdentifiers || [];
  const isbn13 = ids.find((i) => i.type === "ISBN_13")?.identifier;
  const isbn10 = ids.find((i) => i.type === "ISBN_10")?.identifier;
  return isbn13 || isbn10 || null;
}

for (const query of queries) {
  console.log("Query:", query);

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=40&printType=books&orderBy=relevance&langRestrict=fr`
  );

  console.log("status:", response.status);
  const result = await response.json();
  console.log("items:", result.items?.length || 0);

  if (!result.items) continue;

  for (const item of result.items) {
    const v = item.volumeInfo || {};

    const isbn = pickIsbn(v);
    const cover =
      v.imageLinks?.thumbnail || v.imageLinks?.smallThumbnail || null;
    const summary = v.description || null;

    //  filtres demandé

    if (v.language !== "fr") continue;
    if (!isbn) continue;
    if (!cover) continue;
    if (!summary) continue;

    try {
      await Book.findOrCreate({
        where: { isbn },
        defaults: {
          isbn,
          title: v.title,
          author: v.authors ? v.authors.join(", ") : "Unknown",
          category: v.categories ? v.categories[0] : "Unknown",
          summary,
          coverUrl: cover,
          publication_date: v.publishedDate ? v.publishedDate.slice(0, 10) : null,
        },
      });
    } catch (err) {
      console.log("SKIP (DB error):", isbn, err?.message);
    }
  }
}

    // =================
    // ** Liens entre user et book
    // =================
    // Objet User initialisé à null
    let myUser = null;

    // Objet Book initialisé à null
    let myBook = null;
    const library = data.library;
    if (!library || library.length === 0) {
      return;
    }
    for (let element of library) {
      // Pour chaque "element" : {user_id, book_id}
      // Faire une recherche dans la BDD pour récupérer un objet User grace à user_id
      // Faire une recherche dans la BDD pour récupérer un objet Book grace a book_id
      // Faire le lien entre l'objet User et l'objet Book
      // Recherche dans la BDD de l'User à modifier
      // SELECT
      myUser = await User.findByPk(element.user_id);
      if (myUser) {
        myBook = await Book.findByPk(element.book_id);
      }
      if (myBook) {
        // La User et le Book existent.
        // Je peux ajouter le Book dans la liste des Books pour le User

        // Méthode magique fournie par Sequelize au moment où on a déclaré User Belongs To Many Book
        await myUser.addBook(myBook);
      } else {
        throw Error("myBook is null");
      }
    }
    console.log(" Seeding complete!");
  } catch (error) {
    console.log("Error seeding BDD", error);
  } 
  // finally {
  //   // Ferme la connexion à la BDD
  //   await sequelize.close();
  // }
}

await seed();