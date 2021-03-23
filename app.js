const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const compression = require('compression');
const helmet = require('helmet');
const mongoose = require('mongoose');
const keys = require('./key');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(helmet());
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(express.static(__dirname + '/app/public'));
app.use(compression());

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});


app.set('views', path.join(__dirname, 'app/views'))
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render('index')
});

require('./app/routes/book.routes.js')(app);


const PORT = process.env.PORT || 3000;



/**
 * @param start
 * асинхронный метод для вызова базы данных, после успешного подключение к базе данных запускает сервер
 */

async function start() {

    await mongoose.connect(`${keys.MONGO_URL}`, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Успешно подключился к базе данных");

        app.listen(PORT, () => {
            console.log("Сервер прослушивает порт 3000");
        });

    }).catch(err => {
        console.log('Не удалось подключиться к базе данных.', err);
        process.exit();
    });

}

start();