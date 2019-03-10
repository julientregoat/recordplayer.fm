'use strict'

import Express from 'express'

const app = Express();
const bodyParser = require('body-parser');

import dotenv from 'dotenv'
dotenv.config()

import api from './routes/api'
import discogs from './routes/discogs'


const port = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/api', api);
app.use('/discogs', discogs)

app.listen(port, () => {
 console.log(`api running on port ${port}`);
});
