// controller for making and viewing requests by employee id. also employee verification
const nodemailer = require('nodemailer');
const moment = require('moment');
const db = require('../models');

function getDate() {
  const d = new Date();
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) { month = `0${month}`; }
  if (day.length < 2) { day = `0${day}`; }

  return [year, month, day].join('-');
}

const verifyDates = (startDate, endDate) => {
  if (moment(startDate).isBefore(endDate, 'day') && moment().isBefore(startDate, 'day')) {
    return true;
  } return false;
};

module.exports = function (app) {
  function sendManagerEmail(email) {
    // Creating output string
    const output = `
        <p>Hello!</p>
        <p>You are receiving this email because one of your employees submitted a new Breakaway request.
        <p>To view the request, please visit the <a href="https://breakaway-vacay.herokuapp.com/">Breakaway</a> portal.</p>
        <p>Thank you for using Breakaway!</p>
        `;

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
        subject: 'New Breakaway Request', // Subject line
        text: 'This is a breakaway test', // plain text body
        html: output, // html body
      });

      // DO NOT REMOVE THE LINE BELOW
      console.log('Email sent: %s', info.messageId);
      // DO NOT REMOVE THE LINE ABOVE
    }
    mainEmail().catch(console.error);
  }

  app.get('/employee-access', (req, res) => {
    res.render('login', { manager: false });
  });

  app.get('/employee-login', (req, res) => {
    res.redirect(`/request/${req.query.employeeId}`);
  });

  // login before viewing/making requests
  app.get('/api/login', (req, res) => {
    res.redirect(`/request/${req.query.id}`);
  });

  app.get('/request/:id', (req, res) => {
    const employeeId = req.params.id;
    db.employee.findAll({
      where: { id: employeeId },
      include: [{ model: db.request }],
      order: [[db.request, 'start', 'DESC']],
    })
      .then((data) => {
        if (!data.length) {
          const msg = { msg: `Employe id ${employeeId} not found` };
          res.status(404) // HTTP status 404: NotFound
            .render('login', msg);
        } else {
          const fName = data[0].dataValues.employee_first;
          const { bank } = data[0].dataValues;
          const manId = data[0].dataValues.manager_id;
          const upcomingRequests = [];
          data[0].dataValues.requests.forEach((request) => {
            const d = request.dataValues;
            const dateCreated = d.createdAt;
            const startDate = d.start;
            const endDate = d.end;
            const { duration } = d;
            const { createdAt } = d;
            const stringCreatedAt = createdAt.toString();
            const formattedCreatedAt = stringCreatedAt.slice(0, (stringCreatedAt.length - 42));
            let status = d.approved;
            if (status === null) {
              status = 'pending';
            } else if (status === true) {
              status = 'approved';
            } else {
              status = 'denied';
            }
            if (endDate >= getDate()) {
              // only show dates that are upcoming
              console.log(endDate);
              upcomingRequests.push({
                dateCreated, startDate, endDate, duration, formattedCreatedAt, status,
              });
            }
          });
          // res.json(upcomingRequests);
          res.render('request', {
            name: fName, upcomingRequests, bank, id: employeeId, manId,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.post('/api/request', (req, res) => {
    const d = req.body;
    const startTime = d.formData.startDate;
    const endTime = d.formData.endDate;
    const duration = moment
      .duration(moment(endTime, 'YYYY/MM/DD')
        .diff(moment(startTime, 'YYYY/MM/DD'))).asDays();
    console.log(duration);
    if (verifyDates(startTime, endTime)) {
      db.request.create({
        start: d.formData.startDate,
        end: d.formData.endDate,
        reason: d.formData.reason,
        employeeId: d.id,
        duration,
      })
        .then((result) => {
          console.log(result);
          res.redirect('back');
        })
        .catch((error) => {
          console.log(error);
          res.status(404).send({ error: 'Something is wrong' });
        });
      db.employee.findAll({
        where: {
          id: req.body.manager_id,
        },
      }).then((data) => {
        const manEmail = data[0].dataValues.email;
        sendManagerEmail(manEmail);
      });
    } else {
      res.status(404).send({ error: 'Bad dates!' });
    }
  });
  app.get('/api/requests', (req, res) => {
    db.request.findAll({}).then((results) => {
      res.json(results);
      console.log(results);
    });
  });

  app.get('/request', (req, res) => {
    const msg = { msg: 'Please go back and login in to view your requests.' };
    res.render('404', msg);
  });
};
