const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary');

const router = express.Router();

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
  api_secret: 'hiding this for security reasons'
});

// get root route
router.get('/', (req, res) => {
  // sends object to handlebars template
  // use for testing in postman
  // res.send(hbsOb);
  res.render('index');
});

// add burger (post)
router.post('/api/upload', upload.single('image'), (req, res) => {
  console.log(req.body);

  cloudinary.v2.uploader.upload(req.file.path,  { width: 350, height: 350, crop: "limit" }, (err, result) => {

    console.log(err, result);
    // add cloudinary url for the image to the campground object under image property
    const imageUrl = result.secure_url;

    res.send({
      result: req.body,
      image_url: imageUrl,
    });
  });
});

module.exports = router;
