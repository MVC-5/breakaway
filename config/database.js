const Sequelize = require('sequelize');

module.exports = new Sequelize('breakaway_db', 'root', 'Huskies7', {
  host: 'localhost',
  dialect: 'mysql',
});
