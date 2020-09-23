// Multer is a node.js middleware for handling multipart/form-data
const multer = require('multer');

// Cloudinary is a cloud service to a web application's entire image management pipeline
const cloudinary = require('cloudinary');

const storage = multer.diskStorage({
  filename(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter: imageFilter });

cloudinary.config({
  cloud_name: 'breakbreakaway',
  api_key: '496689558829542',
  api_secret: 'hidden for secrecy',
});
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
    db.feed.findAll({}).then((feedData) => {
      console.log(feedData);
      res.json(feedData);
    });
  });

  //  send this object from form. {
  //     'description': 'I went to the sandy palaces of Sedona AZ and drank cold beer.',
  //     'pic_link': 'https://dummyimage.com/200x200/000/fff&text=beer+me',
  //     'location': 'Sedona, AZ',
  //     'id': '3'
  //      }
  app.post('/api/new-post', upload.single('image'), (req, res) => {
    console.log(req.body);
    cloudinary.v2.uploader.upload(req.file.path, { width: 350, height: 350, crop: 'limit' }, (err, result) => {
      console.log(err, result);
      // add cloudinary url for the image to the campground object under image property
      const imageUrl = result.secure_url;

      res.send({
        result: req.body,
        image_url: imageUrl,
      });
    });
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

  // image uploader

  // add burger (post)
  // app.post('/api/upload', upload.single('image'), (req, res) => {
  //   console.log(req.body);

  // });
};
