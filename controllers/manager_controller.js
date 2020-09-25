// routes for the manager page and queries for data
const nodemailer = require('nodemailer');
const db = require('../models');

module.exports = (app) => {
  function sendEmployeeEmail(req) {
    let decision = req.body.reqStatus;
    if (decision === '0') {
      decision = 'denied';
    } else if (decision === '1') {
      decision = 'approved';
    }
    // Creating output string
    const output = `
        <p>Hello!</p>
        <p>You are receiving this email because your manager has made an update to your recent Breakaway request.
        <p>Your request for dates ${req.body.start} through ${req.body.end} has been ${decision} by your manager. To view your recent request, please visit the <a href="https://breakaway-vacay.herokuapp.com/">Breakaway</a> portal.</p>
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
        to: req.body.email, // list of receivers
        cc: 'dev.breakaway@gmail.com',
        subject: 'Breakaway Request Update', // Subject line
        text: 'This is a breakaway test', // plain text body
        html: output, // html body
      });

      // DO NOT REMOVE THE LINE BELOW
      console.log('Email sent: %s', info.messageId);
      // DO NOT REMOVE THE LINE ABOVE
    }
    mainEmail().catch(console.error);
  }
  // login before viewing/making requests
  app.get('/manager-access', (req, res) => {
    res.render('login', { manager: true });
  });

  app.get('/manager-login', (req, res) => {
    res.redirect(`/manager/${req.query.managerId}`);
  });

  app.get('/manager/:id', (req, res) => {
    db.employee.findAll({
      where: { manager_id: req.params.id },
      include: [{ model: db.request }, { model: db.role }],
      order: [
        [db.request, 'start', 'ASC'],
      ],
    })
      .then((data) => {
        if (!data.length) {
          const msg = `Either manager id ${req.params.id} not found or no employees are assigned to this manager`;
          res.status(404) // HTTP status 404: NotFound
            .render('login', { msg, manager: true });
        } else {
          const employeeRequests = [];
          data.forEach((employee) => {
            const emp = employee.dataValues;
            if (emp.requests[0]) {
              emp.requests.forEach((request) => {
                const empReq = request.dataValues;
                const empId = emp.id;
                const name = `${emp.employee_first} ${emp.employee_last}`;
                const { email } = emp;
                const role = emp.role.dataValues.title;
                const { bank } = emp;
                const { start, end } = empReq;
                const { createdAt } = empReq;
                const reqId = empReq.id;
                const { duration } = empReq;
                const stringCreatedAt = createdAt.toString();
                const reqDate = stringCreatedAt.slice(0, (stringCreatedAt.length - 42));
                let { reason } = empReq;
                // original status
                let ogStat = empReq.approved;
                let status = empReq.approved;
                if (status === null) {
                  status = 'pending';
                } else if (!status) {
                  status = 'denied';
                  ogStat = 'denied';
                } else if (status) {
                  status = 'approved';
                  ogStat = 'approved';
                }
                if (reason === null) {
                  reason = 'N/A';
                }
                employeeRequests.push({
                  // eslint-disable-next-line max-len
                  empId, name, role, start, end, duration, reqDate, status, ogStat, bank, reason, reqId, email,
                });
              });
            }
          });

          // // res.json(upcomingRequests);
          res.render('manager', { employeeRequests });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.put('/api/manager/update', (req, res) => {
    const status = parseInt(req.body.reqStatus, 10);
    const requestId = parseInt(req.body.reqId, 10);
    sendEmployeeEmail(req);
    db.request.update(
      {
        approved: status,
      },
      {
        where: {
          id: requestId,
        },
      },
    ).then((request) => {
      res.json(request);
    });
    db.employee.update(
      {
        bank: req.body.bank,
      },
      {
        where: {
          id: req.body.empId,
        },
      },
    ).then(() => {
      console.log('Bank updated!');
    });
  });
};
