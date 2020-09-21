const express = require('express');

const router = express.Router();

const db = require('../config/config.json');

const dept = require('../models/department');

router.get('/', (req, res) => dept.findAll()
  .then((routes) => {
    console.log(routes);
    res.sendStatus(200);
  })
  .catch((err) => console.log(err)));

module.exports = router;
