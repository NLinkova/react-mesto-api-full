const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/userController');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { userValidator } = require('./middlewares/userValidator');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const ErrorNotFound = require('./errors/ErrorNotFound');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(requestLogger);
// routes
app.post('/signin', userValidator, login);
app.post('/signup', userValidator, createUser);

app.use(auth);

app.use('/users', require('./routes/userRoutes'));
app.use('/cards', require('./routes/cardRoutes'));

app.use(errorLogger);

app.use((req, res, next) => {
  next(new ErrorNotFound('Not found'));
});
app.use(errors());
app.use(errorHandler);

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

app.listen(PORT, console.log(`Server running on port ${PORT}`));
