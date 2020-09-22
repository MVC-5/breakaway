const express = require('express');

const router = express.Router();

const db = require('../config/config.json');

const dept = require('../models/department');

// When I visit localhost:8080/routes in browser, it states that dept.findAll() is not a function. I'm thinking that maybe this is because we are unable to pass the parameters in index.js?
router.get('/', (req, res) => dept.findAll()
  .then((routes) => {
    console.log(routes);
    res.sendStatus(200);
  })
  .catch((err) => console.log(err)));

module.exports = router;
