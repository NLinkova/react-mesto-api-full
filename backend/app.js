const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/userController');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { userValidator } = require('./middlewares/userValidator');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const ErrorNotFound = require('./errors/ErrorNotFound');

// Слушаем 3000
const { PORT = 3000 } = process.env;

const app = express();
app.use(helmet());

// подключаемся к серверу mongo
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};
connectDB();

// CORS middleware
const CORS_CONFIG = {
  credentials: true,
  origin: [
    'http://linkova.mesto.back.nomoredomains.xyz/',
    'https://linkova.mesto.back.nomoredomains.xyz/',
    'https://localhost:3000',
    'http://localhost:3000',
    'https://localhost:5000',
    'http://localhost:5000',
  ],
};

app.use(cors(CORS_CONFIG));

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(requestLogger);

// crash test
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// routes
app.post('/signin', userValidator, login);
app.post('/signup', userValidator, createUser);

app.use(auth);

app.use('/users', require('./routes/userRoutes'));
app.use('/cards', require('./routes/cardRoutes'));

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.use('*', (req, res, next) => {
  next(new ErrorNotFound('Ресурс по указанному адресу не найден'));
});

app.listen(PORT);
