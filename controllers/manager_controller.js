// routes for the manager page and queries for data
const db = require('../models');

module.exports = (app) => {
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
    })
      .then((data) => {
        if (!data.length) {
          const msg = { msg: `Either manager id ${req.params.id} not found or no employees are assigned to this manager` };
          res.status(404) // HTTP status 404: NotFound
            .render('404', msg);
        } else {
          const employeeRequests = [];
          data.forEach((employee) => {
            const emp = employee.dataValues;
            if (emp.requests[0]) {
              emp.requests.forEach((request) => {
                const empReq = request.dataValues;
                const empId = emp.id;
                const name = `${emp.employee_first} ${emp.employee_last}`;
                const role = emp.role.dataValues.title;
                const { bank } = emp;
                const { start, end } = empReq;
                const { createdAt } = empReq;
                const reqId = empReq.id;
                const { duration } = empReq;
                const stringCreatedAt = createdAt.toString();
                const reqDate = stringCreatedAt.slice(0, (stringCreatedAt.length - 42));
                let { reason } = empReq;
                let status = empReq.approved;
                if (status === null) {
                  status = 'Pending';
                } else if (!status) {
                  status = 'Denied';
                } else if (status) {
                  status = 'Approved';
                }
                if (reason === null) {
                  reason = 'N/A';
                }
                employeeRequests.push({
                  empId, name, role, start, end, duration, reqDate, status, bank, reason, reqId,
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
      // send email based on status of request
    });
    if (status === 1) {
      db.employee.update(
        {
          bank: req.body.bank,
        },
        {
          where: {
            id: req.body.empId,
          },
        },
      ).then((employee) => {
        res.json(employee);
      });
    }
  });
};
