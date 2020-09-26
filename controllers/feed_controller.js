// Multer is a node.js middleware for handling multipart/form-data
const multer = require('multer');
const moment = require('moment');

// Cloudinary is a cloud service to a web application's entire image management pipeline
const cloudinary = require('cloudinary');

const storage = multer.diskStorage({
  filename(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter: imageFilter });

cloudinary.config({
  cloud_name: 'breakbreakaway',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// main page feed routes and queries. including display queries and make new post
const db = require('../models');

module.exports = function (app) {
  app.get('/', (req, res) => {
    db.feed.findAll({ include: [{ model: db.employee }] }).then((feedData) => {
      const postArray = [];
      feedData.forEach((post) => {
        // eslint-disable-next-line no-param-reassign
        post.dataValues.employeeName = `${post.dataValues.employee.dataValues.employee_first} ${post.dataValues.employee.dataValues.employee_last}`;
        // eslint-disable-next-line no-param-reassign
        post.dataValues.formatDate = moment(post.dataValues.createdAt).format('MM/YYYY');
        postArray.push(post.dataValues);
      });
      postArray.reverse();
      const hbsObject = {
        feeds: postArray,
      };
      res.render('index', hbsObject);
    });
  });

  // frontend can hit this to update feed
  app.get('/api/feed', (req, res) => {
    db.feed.findAll({}).then((feedData) => {
      console.log(feedData);
      res.json(feedData);
    });
  });

  app.post('/api/new-post', upload.single('image'), async (req, res) => {
    console.log(req.body);

    const exists = await db.employee.findAll({ where: { id: req.body.employeeId } });
    console.log(exists);
    if (exists.length) {
      cloudinary.v2.uploader.upload(req.file.path, { width: 350, height: 350, crop: 'fill' }, (err, result) => {
        console.log(err, result);
        // add cloudinary url for the image to the campground object under image property
        const imageUrl = result.secure_url;
        db.feed
          .create({
            description: req.body.description,
            pic_link: imageUrl,
            location: req.body.location,
            employeeId: req.body.employeeId,
          })
          .then(() => {
            res.redirect('back');
          });
      });
    } else {
      res.render('404', { msg: `Oh no! No employee found for id ${req.body.employeeId}.` });
    }
  });
};
