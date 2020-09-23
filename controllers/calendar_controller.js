const db = require('../models');

class Approved {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

const arr = [];

module.exports = function (app) {
  app.get('/api/approvedrequests', (req, res) => {
    db.request.findAll({
      where: {
        approved: true,
      },
      include: [{
        model: db.employee,
        where: { manager_id: 2 },
      }],
    }).then((results) => {
      for (let i = 0; i < results.length; i++) {
        const startDate = results[i].start;
        const endDate = results[i].end;
        const newRange = new Approved(startDate, endDate);
        arr.push(newRange);
      }
      res.json(arr);
    });
  });
};
