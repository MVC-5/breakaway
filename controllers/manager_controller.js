// routes for the manager page and queries for data
const moment = require('moment');
const db = require('../models');
const sendEmail = require('../email');

module.exports = (app) => {
  // login before viewing/making requests
  app.get('/manager-access', (req, res) => {
    res.render('login', { manager: true });
  });
  // route for form fallback if js doesnst load
  app.get('/manager-login', (req, res) => {
    res.redirect(`/manager/${req.query.managerId}`);
  });

  // manager dashboard access
  app.get('/manager/:id', (req, res) => {
    db.employee.findAll({
      where: { manager_id: req.params.id },
      include: [{ model: db.request }, { model: db.role }],
      order: [
        [db.request, 'start', 'ASC'],
      ],
    })
      .then((data) => {
        // if no manager found, sends to login screen again
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
                let { start, end } = empReq;
                start = moment(start).format('MM/DD/YYYY');
                end = moment(end).format('MM/DD/YYYY');
                const reqId = empReq.id;
                const { duration } = empReq;
                const reqDate = moment(empReq.createdAt).format('MM/DD/YYYY');
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

  // when manager updates a requests status
  app.put('/api/manager/update', (req, res) => {
    const status = parseInt(req.body.reqStatus, 10);
    const requestId = parseInt(req.body.reqId, 10);
    let decision = req.body.reqStatus;
    if (decision === '0') {
      decision = 'denied';
    } else if (decision === '1') {
      decision = 'approved';
    }
    // Creating output string for email to employee
    const output = `
        <p>Hello!</p>
        <p>You are receiving this email because your manager has made an update to your recent Breakaway request.
        <p>Your request for dates ${req.body.start} - ${req.body.end} has been ${decision} by your manager. To view your recent request, please visit the <a href="https://breakaway-vacay.herokuapp.com/">Breakaway</a> portal.</p>
        <p>Thank you for using Breakaway!</p>
        `;
    const subj = 'Breakaway Request Update';
    const { email } = req.body;
    sendEmail(subj, email, output);
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
    // update request in db
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
