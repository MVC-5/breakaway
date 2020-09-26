// controller for making and viewing requests by employee id. also employee verification
const moment = require('moment');
const db = require('../models');
const sendEmail = require('../email');

// used to make sure only requests that are upcoming are shown
function getDate() {
  const d = new Date();
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) { month = `0${month}`; }
  if (day.length < 2) { day = `0${day}`; }

  return [year, month, day].join('-');
}

// verify dates are sequential and start after current day
const verifyDates = (startDate, endDate) => {
  if (moment(startDate).isBefore(endDate, 'day') && moment().isBefore(startDate, 'day')) {
    return true;
  } return false;
};

module.exports = (app) => {
  // employee login screen
  app.get('/employee-access', (req, res) => {
    res.render('login', { manager: false });
  });
  // fallback for form request if js doesnt load
  app.get('/employee-login', (req, res) => {
    res.redirect(`/request/${req.query.employeeId}`);
  });

  // login before viewing/making requests
  // login form passes query ?id={id} to this endpoint
  app.get('/api/login', (req, res) => {
    res.redirect(`/request/${req.query.id}`);
  });

  // login redirects to individual employee page
  app.get('/request/:id', (req, res) => {
    const employeeId = req.params.id;
    // find all where joining on request
    // outputs requests for employee id
    db.employee.findAll({
      where: { id: employeeId },
      include: [{ model: db.request }],
      order: [[db.request, 'start', 'DESC']],
    })
      .then((data) => {
        if (!data.length) {
          // if no employee with that id
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
            let startDate = d.start;
            let endDate = d.end;
            startDate = moment(startDate).format('MM/DD/YYYY');
            endDate = moment(endDate).format('MM/DD/YYYY');
            const { duration } = d;
            const { createdAt } = d;
            const reqDate = moment(createdAt).format('MM/DD/YYYY');
            let status = d.approved;
            // status determines class styling and text label
            if (status === null) {
              status = 'pending';
            } else if (status === true) {
              status = 'approved';
            } else {
              status = 'denied';
            }
            if (endDate >= moment(getDate()).format('MM/DD/YYYY')) {
              // only show dates that are upcoming
              console.log(endDate);
              upcomingRequests.push({
                dateCreated, startDate, endDate, duration, reqDate, status,
              });
            }
          });
          res.render('request', {
            name: fName, upcomingRequests, bank, id: employeeId, manId,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // creating a new request
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
        // send email to that employee's manager
        const { email } = data[0].dataValues;
        const output = `
          <p>Hello!</p>
          <p>You are receiving this email because one of your employees submitted a new Breakaway request.
          <p>To view the request, please visit the <a href="https://breakaway-vacay.herokuapp.com/">Breakaway</a> portal.</p>
          <p>Thank you for using Breakaway!</p>
        `;
        const subj = 'New Breakaway Request';
        sendEmail(subj, email, output);
      });
    } else {
      res.status(404).send({ error: 'Bad dates!' });
    }
  });

  // util to view requests
  app.get('/api/requests', (req, res) => {
    db.request.findAll({}).then((results) => {
      res.json(results);
    });
  });

  // if access is attempted before login
  app.get('/request', (req, res) => {
    const msg = { msg: 'Please go back and login in to view your requests.' };
    res.render('404', msg);
  });
};
