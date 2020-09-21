const db = require('../models');

module.exports = (app) => {
  app.get('/api/requests', (req, res) => {
    db.request.findAll({}).then((results) => {
      res.json(results);
      console.log(results);
    });
  });

  // Do a JOIN with employees foreign Key is managerID
  app.get('/api/requests/manager', (req, res) => {
    db.request.findAll({

      include: {
        model: db.employee,
        where: {

          manager_id: 2,

        },
      },
    }).then((results) => {
      res.json(results);
    });
  });

  app.get('/api/requests/employee', (req, res) => {
    db.request.findAll({
      where: {
        employeeId: 2,
      },
    }).then((results) => {
      res.json(results);
    });
  });

  app.post('api/requests/newemployeerequest', (req, res) => {
    db.request.create({

      employee_id: req.body.employee_id,
      start: req.body.start,
      end: req.body.end,
      manager_id: req.body.manager_id,
      reason: req.body.reason,
      approved: req.body.approved,

    })
      .then((results) => {
        res.json(results);
      });
  });

  // app.put('api/requests/:id', (req,res) => {

  //   let condition = req.params.id;

  //   requests.update({
  //     approved: req.body.approved,
  //   }, where: {

  //     id = condition

  //   })

  // });

  app.get('/api/feed', (req, res) => {
    db.post.findAll({}).then((results) => {
      res.json(results);
    });
  });
};
