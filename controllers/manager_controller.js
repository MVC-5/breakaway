// routes for the manager page and queries for data
const db = require('../models');

module.exports = (app) => {
  // login before viewing/making requests
  app.get('/api/login', (req, res) => {
    if (req.query.id === '7') {
      res.send('success');
    } else throw Error;
  });

  app.get('/manager/:id', (req, res) => {
    db.employee.findAll({
      where: { manager_id: req.params.id },
      include: [{ model: db.request }],
    })
      .then((data) => {
        console.log(data);

        const employeeRequests = [];

        const d = data.dataValues;
        const employee = d.employeeId;
        const { start } = d;
        const { end } = d;
        const requested = d.createdAt;
        let { reason } = d;
        let status = d.approved;
        if (reason === null) {
          reason = 'N/A';
        }
        if (status === null) {
          status = 'Pending';
        } else if (status === 0) {
          status = 'Denied';
        } else if (status === 1) {
          status = 'Approved';
        }
        employeeRequests.push({
          employee, start, end, requested, reason, status,
        });

        console.log(employeeRequests);

        // res.json(upcomingRequests);
        res.render('manager', { requests: employeeRequests });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
