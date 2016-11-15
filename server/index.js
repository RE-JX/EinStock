const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 8080;

app.use(bodyParser.json());

app.use((req, res, next) => {
  next();
});

app.use(express.static('client'));


app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname + '/../client/index.html'));
});

app.listen(port)