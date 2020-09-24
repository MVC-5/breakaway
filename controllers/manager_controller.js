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
          const msg = `Either manager id ${req.params.id} not found or no employees are assigned to this manager`;
          res.status(404) // HTTP status 404: NotFound
            .render('login', { msg, manager: true });
        } else {
          const employeeRequests = [];
          data.forEach((employee) => {
            const emp = employee.dataValues;
            if (emp.requests[0]) {
              const manId = emp.manager_id;
              emp.requests.forEach((request) => {
                const empReq = request.dataValues;
                const name = `${emp.employee_first} ${emp.employee_last}`;
                const role = emp.role.dataValues.title;
                const { bank } = emp;
                const { start, end } = empReq;
                const { createdAt } = empReq;
                const reqId = empReq.id;
                const stringCreatedAt = createdAt.toString();
                const slicedCreatedAt = stringCreatedAt.slice(0, (stringCreatedAt.length - 42));
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
                console.log(reqId);
                employeeRequests.push({
                  name, role, start, end, slicedCreatedAt, status, bank, reason, reqId, manId,
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

  app.put('/api/manager', (req, res) => {
    console.log(req.body);
    // db.request.update({

    //   req.body.status,
    //     {
    //     where: {
    //       id: req.body.id
    //     }
    //   }
    //   }).then((request) => {
    //     // send email based on status of request
    //   })
  });
};
