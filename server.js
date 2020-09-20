// Requiring necessary npm packages
const express = require('express');
const exphbs = require('express-handlebars');

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require('./models');

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/request', (req, res) => {
  res.render('request');
});

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(
      `==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`,
    );
  });
});
