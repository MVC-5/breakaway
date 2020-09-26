const nodemailer = require('nodemailer');

// imported to manager_controller
module.exports = function sendEmail(subj, email, output) {
  // async..await is not allowed in global scope, must use a wrapper
  async function mainEmail() {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dev.breakaway@gmail.com', // gmail user - implement npm dotenv + .env file
        pass: process.env.EMAIL_PASS, // gmail password - implement npm dotenv + .env file
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'dev.breakaway@gmail.com', // sender address
      to: email, // list of receivers
      cc: 'dev.breakaway@gmail.com',
      subject: subj, // Subject line
      text: 'This is a breakaway test', // plain text body
      html: output, // html body
    });

    // DO NOT REMOVE THE LINE BELOW
    console.log('Email sent: %s', info.messageId);
    // DO NOT REMOVE THE LINE ABOVE
  }
  mainEmail().catch(console.error);
};
