// Classe perso HttpError qui hérite de la classe native Error de JS
// Et qui l'enrichit avec des "trucs" en plus
class HttpError extends Error {

  #name;
  // Contient un code d'erreur
  #statusCode;

  constructor(message, code) {
    // super appelle le constructeur de la classe parente Error
    super(message);

    // Une bonne pratique pour les classes d'erreur perso, ajouter un attribut name qui indique le nom de la classe d'erreur
    this.#name = 'HttpError';

    // appel le setter de status code
    this.statusCode = code;
  }

  get name() {
    return this.#name;
  }

  get statusCode() {
    return this.#statusCode;
  }

  set statusCode(value) {
    this.#statusCode = value;
  }
}

export default HttpError;