// controller for making and viewing requests by employee id. also employee verification
const db = require('../models');

module.exports = function (app) {
  // login before viewing/making requests
  app.get('/api/login', (req, res) => {
    if (req.query.id === '7') {
      res.send('succes');
    } else throw Error;
  });

  app.get('/request/:id', (req, res) => {
    db.employee.findAll({
      where: { id: req.params.id },
      include: [{ model: db.request }],
    })
      .then((data) => {
        if (!data.length) {
          const msg = { msg: `Employe id ${req.params.id} not found` };
          res.status(404) // HTTP status 404: NotFound
            .render('404', msg);
        } else {
          const fName = data[0].dataValues.employee_first;
          const { bank } = data[0].dataValues;
          const upcomingRequests = [];
          data[0].dataValues.requests.forEach((request) => {
            const d = request.dataValues;
            const dateCreated = d.createdAt;
            const startDate = d.start;
            const endDate = d.end;
            let status = d.approved;
            if (status === null) {
              status = 'pending';
            }
            upcomingRequests.push({
              dateCreated, startDate, endDate, status,
            });
          });
          // res.json(upcomingRequests);
          res.render('request', { name: fName, upcomingRequests, bank });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
