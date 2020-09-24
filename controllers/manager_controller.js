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
          console.log(data);
          const employeeRequests = [];
          data.forEach((employee) => {
            const emp = employee.dataValues;
            console.log(emp.requests);

            if (emp.requests[0]) {
              emp.requests.forEach((request) => {
                const empReq = request.dataValues;
                const name = `${emp.employee_first} ${emp.employee_last}`;
                const role = emp.role.dataValues.title;
                const { bank } = emp;
                const { start, end } = empReq;
                const { createdAt } = empReq;
                const stringCreatedAt = createdAt.toString();
                console.log(stringCreatedAt);
                const slicedCreatedAt = stringCreatedAt.slice(0, (stringCreatedAt.length - 33));
                let { reason } = empReq;
                let status = empReq.approved;
                console.log(name);
                console.log(role);
                console.log(bank);
                console.log(empReq);
                console.log(start, end);
                console.log(slicedCreatedAt);
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
                console.log(status);
                console.log(reason);
                employeeRequests.push({
                  name, role, start, end, slicedCreatedAt, status, bank, reason,
                });
              });
            }
          });
          // const d = data.employee.dataValues;

          // const employeeFirst = d.employee_first;
          // const { start } = d;
          // const { end } = d;
          // const requested = d.createdAt;
          // let { reason } = d;
          // let status = d.approved;
          // if (reason === null) {
          //   reason = 'N/A';
          // }
          // if (status === null) {
          //   status = 'Pending';
          // } else if (status === 0) {
          //   status = 'Denied';
          // } else if (status === 1) {
          //   status = 'Approved';
          // }
          // employeeRequests.push({
          //   employee, start, end, requested, reason, status,
          // });

          //   console.log(employeeRequests);
          // }

          // // res.json(upcomingRequests);
          res.render('manager', { requests: employeeRequests });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
