const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

// Local dependencies
const rootHandler = require('./controllers/root');
const signinHandler = require('./controllers/signin');
const imageHandler = require('./controllers/image');
const profileHandler = require('./controllers/profile');
const registerHandler = require('./controllers/register');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'isombeg',
      password : 'nyamanayo',
      database : 'smartbrain'
    }
  }
);

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', rootHandler);
app.post('/signin', signinHandler(db, bcrypt));
app.post('/register', registerHandler(db, bcrypt));
app.get('/profile/:id', profileHandler(db));
app.put('/image', imageHandler(db));

app.listen(process.env.PORT || 3001);