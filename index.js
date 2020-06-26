'use strict';
const express = require('express')
const PORT = process.env.PORT || 3001
const app = express();
const MongoClient = require('mongodb').MongoClient;
const dbName = "appointmentSystem"
const url = process.env.mongodburl || `mongodb+srv://sho19:951753654@appointmentsystem-0zmpg.gcp.mongodb.net/appointmentSystem?retryWrites=true&w=majority`;
const mDbClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.listen(PORT, () => console.log("listening", PORT));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  req.mDbClient = mDbClient;
  next();
})
app.use('/', require('./routes/app'))
//exports.mbClient = mbClient
module.exports = app


