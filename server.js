const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const Clarifai = require('clarifai');

// Local dependencies
const rootHandler = require('./controllers/root');
const signinHandler = require('./controllers/signin');
const imageHandler = require('./controllers/image');
const profileHandler = require('./controllers/profile');
const registerHandler = require('./controllers/register');
const faceDetect = require('./controllers/faceDetect');

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

const clarifaiApp = new Clarifai.App({
    apiKey: 'ffae0e82726a4f91855cf68633e4b26f'
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', rootHandler);
app.post('/signin', signinHandler(db, bcrypt));
app.post('/register', registerHandler(db, bcrypt));
app.get('/profile/:id', profileHandler(db));
app.post('/detect', faceDetect(Clarifai, clarifaiApp));
app.put('/image', imageHandler(db));

// app.listen(process.env.PORT || 3001);
app.listen(3001);