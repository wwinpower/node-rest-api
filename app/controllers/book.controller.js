const Book = require('../models/book.model.js');


/**
 * @param create
 * Create - Метод для добавление элементов в базу данных
 */

exports.create = (req, res) => {
    if(!req.body.content) {
        return res.status(400).send({
            message: "Содержание не может быть пустым"
        });
    }

    const book = new Book({
        title: req.body.title || "Без названия", 
        content: req.body.content
    });

    book.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "При создании данных произошла ошибка."
        });
    });
};


/**
 * @param findAll
 * FindAll - Метод для получения всех элементов из базы данных
 */

exports.findAll = (req, res) => {
    Book.find()
    .then(books => {
        res.send(books);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "При получении данных произошла ошибка."
        });
    });
};


/**
 * @param findOne
 * findOne - Метод получает идентификатор и возвращяет элемент
 */
exports.findOne = (req, res) => {
    Book.findById(req.params.bookId)
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Данные с идентификатором не найдена" + req.params.bookId
            });            
        }
        res.send(book);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Данные с идентификатором не найдена " + req.params.bookId
            });                
        }
        return res.status(500).send({
            message: "Ошибка при получении данных с идентификатором " + req.params.bookId
        });
    });
};

/**
 * @param update
 * Update - Метод получает идентификатор и новый объект, после чего меняет старые данные на новые
 */

exports.update = (req, res) => {

    if(!req.body.content) {
        return res.status(400).send({
            message: "Содержание не может быть пустым"
        });
    }

    Book.findByIdAndUpdate(req.params.bookId, {
        title: req.body.title || "Без названия",
        content: req.body.content
    }, {new: true})
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Данные с идентификатором не найдена " + req.params.bookId
            });
        }
        res.send(book);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Данные с идентификатором не найдена " + req.params.bookId
            });                
        }
        return res.status(500).send({
            message: "Ошибка обновления данных с идентификатором " + req.params.bookId
        });
    });
};

/**
 * @param delete
 * Delete - Метод получает идентификатор и удаляет его из списка
 */
exports.delete = (req, res) => {
    Book.findByIdAndRemove(req.params.bookId)
    .then(book => {
        if(!book) {
            return res.status(404).send({
                message: "Данные с идентификатором не найдена " + req.params.bookId
            });
        }
        res.send({message: "Успешно удалена!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Данные с идентификатором не найдена " + req.params.bookId
            });                
        }
        return res.status(500).send({
            message: "Не удалось удалить данные с идентификатором " + req.params.bookId
        });
    });
};
