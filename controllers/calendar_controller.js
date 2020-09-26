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

function getDates(results) {
  const arr = [];

  for (let i = 0; i < results.length; i += 1) {
    const startDate = results[i].start;

    const endDate = results[i].end;

    const newRange = new Approved(startDate, endDate);
    arr.push(newRange);
  }
  const nextArr = [];
  for (let i = 0; i < arr.length; i += 1) {
    const startDate = moment(arr[i].start, 'YYYY-MM-DD');

    const endDate = moment(arr[i].end, 'YYYY-MM-DD');
    const range = moment.range(startDate, endDate);
    nextArr.push(Array.from(range.by('days')).map((m) => m.format('ddd-YYYY-MM-DD')));
  }

  const flatArray = nextArr.flat();
  let uniqueDates = [];
  flatArray.forEach((c) => {
    if (!uniqueDates.includes(c)) {
      uniqueDates.push(c);
    }
  });
  const limit = moment().add(1, 'month').format('ddd-YYYY-MM-DD');

  uniqueDates = uniqueDates.filter((date) => moment(date, 'ddd-YYYY-MM-DD') < moment(limit, 'ddd-YYYY-MM-DD'));
  const calendar = [];

  const diff = Math.abs(moment().diff(limit, 'days'));

  for (let i = 0; i < diff; i += 1) {
    const day = moment().day(1).add(i, 'day').format('ddd-YYYY-MM-DD');
    let taken = 'denied';
    uniqueDates.forEach((d) => {
      if (d === day) taken = 'approved';
    });
    const toAdd = {
      date: day,
      taken,
    };
    calendar.push(toAdd);
  }
  return calendar;
}

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
      const dateArr = getDates(results);
      res.json(dateArr);
    });
  });

  app.get('/api/approvedrequests/emp/:id', (req, res) => {
    db.employee.findAll({
      where: {
        id: req.params.id,
      },

    })
      .then((result) => {
        const empMan = result[0].dataValues.manager_id;
        const dateArr = getDates(empMan);
        res.json(dateArr);
      })
      .catch(() => {
        const dateArr = getDates(req.params.id);
        res.json(dateArr);
      });
  });
};
