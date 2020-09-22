// controller for making and viewing requests by employee id. also employee verification
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

module.exports = function (app) {
  // login before viewing/making requests
  app.get('/api/login', (req, res) => {
    if (req.query.id === '7') {
      res.send('succes');
    } else throw Error;
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
            if (endDate >= getDate()) {
              // only show dates that are upcoming
              console.log(endDate);
              upcomingRequests.push({
                dateCreated, startDate, endDate, status,
              });
            }
          });
          // res.json(upcomingRequests);
          res.render('request', {
            name: fName, upcomingRequests, bank, id: employeeId,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  app.post('/api/request', (req, res) => {
    const d = req.body;
    db.request.create({
      start: d.formData.startDate,
      end: d.formData.endDate,
      reason: d.formData.reason,
      employeeId: d.id,
    })
      .then((result) => {
        console.log(result);
        res.redirect('back');
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send({ error: 'Something is wrong' });
      });
  });
};
