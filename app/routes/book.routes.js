module.exports = (app) => {
    const books = require('../controllers/book.controller.js');

    app.post('/books', books.create);

    app.get('/books', books.findAll);

    app.get('/books/:bookId', books.findOne);

    app.put('/books/:bookId', books.update);

    app.delete('/books/:bookId', books.delete);
}