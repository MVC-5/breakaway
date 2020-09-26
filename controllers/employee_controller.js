const db = require('../models');

// Module exports for employee controller

module.exports = (app) => {
  app.post('/api/employee', (req, res) => {
    const data = req.body;
    db.employee.create({
      employee_first: data.employee_first,
      employee_last: data.employee_last,
      email: data.email,
      bank: 40,
      role_id: data.role_id,
      manager_id: data.manager_id,
    })
      .then((result) => {
        res.json(result);
      })
      .catch(() => {
        res.status(404).send({ error: 'Something is wrong' });
      });
  });

  app.delete('/api/employee/:id', (req, res) => {
    const fired = req.params.id;

    db.employee.destroy({

      where: {
        id: fired,
      },

    }).then((result) => {
      res.json(result);
    }).catch(() => {
      res.status(404).send({ error: 'Something is wrong' });
    });
  });
};
