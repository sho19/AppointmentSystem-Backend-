const express = require('express');
const router = new express.Router();

const app = require('../services/app.js');


router.post('/signUp', async function (req, res, next) {
  let options = {}

  options.mDbClient = req.mDbClient;
  options.body = req.body;
  app.signUp(options).then((result) => {
    res.status(result.status).send(result.response)
  }).catch((result) =>
    res.status(result.status).send(result.response)

  )
});

// client.connect(err => {
//   console.log("Connected successfully to server");
//   const db = client.db("appointmentystem");
//   console.log("db", db)
//   insertDocuments(db, function () {
//     client.close();
//   });
// });
// const insertDocuments = function (db, callback) {
//   const collection = db.collection('buyers');
//   collection.insertMany([
//     { a: 1 }, { a: 2 }, { a: 3 }
//   ], function (err, result) {
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }
module.exports = router;