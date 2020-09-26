// Requiring necessary npm packages
const express = require('express');
const exphbs = require('express-handlebars');

const dotenv = require('dotenv');

dotenv.config();
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

// all the good stuff here
require('./controllers/feed_controller')(app);
require('./controllers/request_controller')(app);
require('./controllers/manager_controller')(app);
require('./controllers/calendar_controller')(app);
require('./controllers/employee_controller')(app);

// catch all rendering 404 page
app.get('/*', (req, res) => {
  const msg = { msg: 'Nothing to see here..' };
  res.render('404', msg);
});

// Syncing our database and logging a message to the user upon success
// add force:true to rebuild tables
db.sequelize.sync({}).then(() => {
  app.listen(PORT, () => {
    console.log(
      `==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`,
    );
  });
});
