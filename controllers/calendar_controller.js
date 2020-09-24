const Moment = require('moment');
const MomentRange = require('moment-range');
const db = require('../models');

const moment = MomentRange.extendMoment(Moment);

class Approved {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
}

const arr = [];

module.exports = function (app) {
  app.get('/api/approvedrequests/:id', (req, res) => {
    db.request.findAll({
      where: {
        approved: true,
      },
      include: [{
        model: db.employee,
        where: { manager_id: req.params.id },
      }],
    }).then((results) => {
      for (let i = 0; i < results.length; i += 1) {
        const startDate = results[i].start;
        const endDate = results[i].end;
        const newRange = new Approved(startDate, endDate);
        arr.push(newRange);
      }
      const nextArr = [];
      for (let i = 0; i < arr.length; i += 1) {
        const startDate = new Date(arr[i].start);
        const endDate = new Date(arr[i].end);
        const range = moment.range(startDate, endDate);
        nextArr.push(Array.from(range.by('days')).map((m) => m.format('YYYY-MM-DD')));
      }
      console.log(arr);
      res.json(nextArr);
    });
  });
};
