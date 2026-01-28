import sequelize from '../models/sequelize.client.js';
import argon2 from 'argon2';
import { User, Book } from '../models/index.js';
import data from './data-examples.json' with { type: 'json'};

async function seed() {
    console.log('Syncing database...');
  try {
    const users = data.users;
    for (let user of users){
        const hash = await argon2.hash(user.password);
        await User.create(
            {
                email: user.email,
                username: user.username,
                password: hash
            });
         }
         console.log('Users seeded');

    // =====================
    // 2. BOOKS (Google API)
    // =====================
    const queries = [
        'harry potter',
        'the lord of the rings',
        'game of thrones',
        'the witcher'
    ];

    for(const query of queries){
        console.log('Query:', query)
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`
    );
    console.log('status:', response.status);
    const result = await response.json();
     console.log(' items:', result.items?.length)

    if (result.items){
    for (const item of result.items) {
      await Book.create({
        isbn: item.volumeInfo.industryIdentifiers
        ? item.volumeInfo.industryIdentifiers[0].identifier
        : null,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors
          ? item.volumeInfo.authors.join(', ')
          : 'Unknown',
        category: 'fantasy',
        summary: item.volumeInfo.description || null,
        coverUrl: item.volumeInfo.imageLinks?.thumbnail || item.volumeInfo.imageLinks?.smallThumbnail || null,
        publication_date: item.volumeInfo.publishedDate
        ? item.volumeInfo.publishedDate.slice(0, 10)
        : null,
      });
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
					throw Error('myBook is null')
				}
		}
        console.log(' Seeding complete!');

	} catch (error) {
		console.log('Error seeding BDD', error);
	} 
}

await seed();