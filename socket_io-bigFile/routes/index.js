var express = require('express');
var router = express.Router();
const fs = require('fs');
const multer = require('multer');
const upload = multer({
  limits: {
    // fileSize: (1024 * 10),
    fileSize: 10000000000,
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', upload.single('file'), async function(req, res) {
  const file = req.file;
  // console.log('file:', file);
  let fileName = `${file.originalName}`;
  const writeStream = fs.createWriteStream(`${__dirname}/../uploads/${fileName}`);
  await file.stream.pipe(writeStream);
  // res.send(`File ${fileName} successfully loaded!`);

  // res.render('index', { title: 'Express' });
});

module.exports = router;
