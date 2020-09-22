// main page feed routes and queries. including display queries and make new post
const db = require('../models');

module.exports = function (app) {
  app.get('/', (req, res) => {
    db.feed.findAll({}).then((feedData) => {
      const postArray = [];
      feedData.forEach((post) => {
        postArray.push(post.dataValues);
      });
      const hbsObject = {
        feeds: postArray,
      };
      res.render('index', hbsObject);
    });
  });

  // frontend can hit this to update feed
  app.get('/api/feed', (req, res) => {
    console.log('hit');
    db.feed.findAll({}).then((feedData) => {
      console.log(feedData);
      res.json(feedData);
    });
  });

  //  send this object from form. {
  //     "description": "I went to the sandy palaces of Sedona AZ and drank cold beer.",
  //     "pic_link": "https://dummyimage.com/200x200/000/fff&text=beer+me",
  //     "location": "Sedona, AZ",
  //     "id": "3"
  //      }
  app.post('/api/new-post', (req, res) => {
    console.log(req.body);
    db.feed
      .create({
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
};
