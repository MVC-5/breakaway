const db = require('../models');

module.exports = function (app) {
  app.get('/api/feed', (req, res) => {
    console.log('hit');
    db.feed.findAll({})
      .then((feedData) => {
        console.log(feedData);
        res.json(feedData);
      });
  });

  app.post('/api/new-post', (req, res) => {
    console.log(req.body);
    db.feed.create({
      description: req.body.description,
      pic_link: req.body.pic_link,
      location: req.body.location,
      employeeId: req.body.id,
    })
      .then((result) => {
        res.json(result);
        console.log(result);
      });
  });

  app.get('/api/login', (req, res) => {
    if (req.query.id === '7') {
      res.send('succes');
    } else throw Error;
  });
};
