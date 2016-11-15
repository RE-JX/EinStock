const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 8080;

//-----------------middleware---------------
//------------------------------------------
app.use(bodyParser.json());

app.use((req, res, next) => {
  next();
});

app.use(express.static(path.join(__dirname + '/../client')));

app.use('/public', express.static(path.join(__dirname + '/../node_modules')));  

//-----------------routes-------------------
//------------------------------------------
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname + '/../client/index.html'));
});

app.listen(port, () => {
  console.log('listening on port: ', port);
});