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

// app.get('/', (req, res) => res.render('index'));

require('./controllers/feed_controller')(app);
require('./controllers/request_controller')(app);
require('./controllers/manager_controller')(app);
require('./controllers/calendar_controller')(app);
require('./controllers/employee_controller')(app);

app.get('/*', (req, res) => {
  const msg = { msg: 'Nothing to see here..' };
  res.render('404', msg);
});

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({}).then(() => {
  app.listen(PORT, () => {
    console.log(
      `==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`,
    );
  });
});
