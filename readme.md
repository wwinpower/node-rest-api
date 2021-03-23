REST API BOOK

1.  В файле /key/key.dev.js нужно добавить url mongoDB.

2.  Все запросы можно проверить в файле requests.rest, для этого нужно установить плагин REST Client для vscode.

3.  GET http://localhost:3000/books  - Выводит все данные из базы данных
    POST http://localhost:3000/books - Принимает 2 значения, первый это заголовок(title) книги, второй это описание(content)
    GET http://localhost:3000/books/:bookId - Ищем книгу по его индификатору(bookId) и вводим результат
    PUT http://localhost:3000/books/:bookId - Ищем книгу по его индификатору(bookId) и изменяем данные на новые
    DELETE http://localhost:3000/books/:bookId - Ищем книгу по его индификатору(bookId) и удаляем его
