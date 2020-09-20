// Requiring necessary npm packages
const express = require('express');
// const email = require('./email');

// // ==========================================================================
// Requiring npm packages for email notifications
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
// // ==========================================================================


// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require('./models');

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static('/public'));

// Static folder using npm path
app.use('/public', express.static(path.join(__dirname, 'public')));

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(
      `==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`,
    );
  });
});


// ==========================================================================
// View engine setup for email notification
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body parser middleware from github body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Creating get route to read the form
app.get('/', (req, res) => {
  res.render('partials/contact');
});

// Creating post route for the submission
app.post('/send', (req, res) => {
  // console log testing
  console.log(req.body);

  // Creating output string
  const output = `
  <p>You have a new breakaway request</p>
  <h3>Contact Details</h3>
  <ul>
    <li>Name: ${req.body.Field1}</li>
    <li>Email: ${req.body.Field3}</li>
  </ul>
  <h3>Message</h3>
  <p>${req.body.Field4}</p>
  `;
  
    // async..await is not allowed in global scope, must use a wrapper
  async function main() {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      // port: 587,
      // secure: false, // true for 465, false for other ports
      service: 'gmail',
      auth: {
        user: 'dev.breakaway@gmail.com', // gmail user - implement npm dotenv + .env file
        pass: 'mvc-5-breakaway', // gmail password - implement npm dotenv + .env file
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'dev.breakaway@gmail.com', // sender address
      to: "jonathan.martb@gmail.com", // list of receivers
      cc: "dev.breakaway@gmail.com",
      subject: "Hello Dev!", // Subject line
      text: "This is a breakaway test", // plain text body
      html: output, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    res.render('partials/contact', {msg: 'Email has been sent!'})
  }
  main().catch(console.error);

});

// ==========================================================================
