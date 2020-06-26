const express = require('express');
const router = new express.Router();

const app = require('../services/app.js');


router.post('/signUp', async function (req, res, next) {
  let options = {};
  options.mDbClient = req.mDbClient;
  options.body = req.body;
  app.signUp(options).then((result) => {
    res.status(result.status).send(result.response)
  }).catch((result) =>
    res.status(result.status).send(result.response)

  )
});
router.post('/login', async function (req, res, next) {
  let options = {};
  options.mDbClient = req.mDbClient;
  options.body = req.body;
  options.category = req.query.category,
    app.login(options).then((result) => {
      res.status(result.status).send(result.response)
    }).catch((result) =>
      res.status(result.status).send(result.response)
    )
});

router.get('/getAllServiceProvider', async function (req, res, next) {
  let options = {};
  options.mDbClient = req.mDbClient;
  options.body = req.body;
  options.category = req.query.category,
    app.getAllServiceProvider(options).then((result) => {
      res.status(result.status).send(result.response)
    }).catch((result) =>
      res.status(result.status).send(result.response)
    )
});

router.post('/setAvailableTime/:userName', async function (req, res, next) {
  let options = {};
  options.mDbClient = req.mDbClient;
  options.body = req.body;
  options.userName = req.params.userName,
    app.setAvailableTime(options).then((result) => {
      res.status(result.status).send(result.response)
    }).catch((result) =>
      res.status(result.status).send(result.response)
    )
});

router.post('/bookAppointments/:userName/:serProvider', async function (req, res, next) {
  let options = {};
  options.mDbClient = req.mDbClient;
  options.body = req.body;
  options.userName = req.params.userName,
    options.serProvider = req.params.serProvider
  app.bookAppointments(options).then((result) => {
    res.status(result.status).send(result.response)
  }).catch((result) =>
    res.status(result.status).send(result.response)
  )
});

router.delete('/rejectAppointment/:customerName/:username', async function (req, res, next) {
  let options = {};
  options.mDbClient = req.mDbClient;
  options.userName = req.params.userName;
  options.customerName = req.params.customerName,
    app.rejectAppointment(options).then((result) => {
      res.status(result.status).send(result.response)
    }).catch((result) =>
      res.status(result.status).send(result.response)
    )
});


module.exports = router;