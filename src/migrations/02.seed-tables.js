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
      "harry potter",
      "the lord of the rings",
      "game of thrones",
      "the witcher",
    ];

    for (const query of queries) {
      console.log("Query:", query);
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`,
      );
      console.log("status:", response.status);
      const result = await response.json();
      console.log(" items:", result.items?.length);

      if (result.items) {
        for (const item of result.items) {
          await Book.create({
            isbn: item.volumeInfo.industryIdentifiers
              ? item.volumeInfo.industryIdentifiers[0].identifier
              : null,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors
                            // .join(', ') transforme un tableau en une chaîne de caractères
                            // le paramètre (', ') est le séparateur entre les éléments exemplte : const authors = ['Tolkien', 'Lewis', 'Rowling'];
                            // authors.join(', '); devient -- > "Tolkien, Lewis, Rowling"
              ? item.volumeInfo.authors.join(", ")
              : "Unknown",
            category: item.volumeInfo.categories
              ? item.volumeInfo.categories[0]
              : "Unknown",
            summary: item.volumeInfo.description || null,
            coverUrl:
              item.volumeInfo.imageLinks?.thumbnail ||
              item.volumeInfo.imageLinks?.smallThumbnail ||
              null,
            publication_date: item.volumeInfo.publishedDate
                                            // slice(0, 10) prend les 10 premiers caractères
              ? item.volumeInfo.publishedDate.slice(0, 10)
              : null,
          });
        }
      }
    }
    console.log(" Seeding complete!");
  } catch (error) {
    console.log("Error seeding BDD", error);
    // Script --> ouvre --> ferme (seulement en dev)
    // Serveur --> ouvre --> ne ferme jamais(sauf shutdown) donc à commenter lors du create et seed db pour le déploiement ( à faire 1 seul fois lors du déploiement pour insérer les données une première fois puis commit/push)
    //ensuite retirer la fonction create/seed et re commit/push et redéployer auto
    //quand je dit à commenter je parle du finally ici !!
  } 
}

await seed();
