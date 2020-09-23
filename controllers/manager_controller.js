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
      include: [{ model: }]
    })
      .then((data) => {
        let employeeRequests;
        if (!data.length) {
          const msg = { msg: `Either manager id ${req.params.id} not found or no employees are assigned to this manager` };
          res.status(404) // HTTP status 404: NotFound
            .render('404', msg);
        } else {
          console.log(data[0].dataValues.id);
          employeeRequests = [];
          for (let i = 0; i < data.length; i += i) {
            console.log('yes');
            db.request.findAll({
              where: { employeeId: data[i].dataValues.id },
            }).then((response) => {
              const d = response.dataValues;
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
            });
          }
          console.log(employeeRequests);
        }

        // res.json(upcomingRequests);
        res.render('manager', { requests: employeeRequests });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};