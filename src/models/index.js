import Book from './book.model.js';
import User from './user.model.js';
import Library from './library.model.js';

// ** 1 Card belongs to many Tag **
// Pour la relation N - N entre User et Book il faut utiliser une table pivot (une table intermédiaire)
// On va configurer cette table pivot avec le code ci-dessous :
User.belongsToMany(Book, {

	// Nom de la table pivot entre User et Book
	through: 'Library',
	
	// On peut configurer la manière de traduire la relation ==> configurer la table pivot
	// clé étrangère dans la table pivot vers la table user
	foreignKey: 'user_id',
	
	// clé étrangère dans la table pivot vers la table book
	otherKey: 'book_id',
	
	// alias de l'association : 1 User belongs to many Book ==> donc tag au pluriel *books*
	as: 'books'
});

// ** 1 Book belongs to many User **
// Pour la relation N - N entre Book et User il faut utiliser une table pivot (une table intermédiaire)
// On va configurer cette table pivot avec le code ci-dessous :
Book.belongsToMany(User, {

	// Nom de la table pivot entre User et Book
	// ! Attention ! Il faut mettre le même nom de table pivot que dans le belongsToMany juste au dessus !
	through: 'Library',

	// On peut configurer la manière de traduire la relation ==> configurer la table pivot
	// clé étrangère dans la table pivot vers la table Category
	// Ici, mettre le même nom que *otherKey* définit plus haut 
	foreignKey: 'book_id',

	// clé étrangère dans la table pivot vers la table User
	// Ici, mettre le même nom que *foreignKey* définit plus haut 
	otherKey: 'user_id',

	// alias de l'association : 1 Book belongs to many User ==> donc plusieurs User *users*
	as: 'users'
});

// Ici on fait l'export des Modèles enrichit de leurs relations entre eux eux
export { Book, User, Library}