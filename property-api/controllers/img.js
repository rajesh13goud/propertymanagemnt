const express = require('express');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(fileUpload());
// app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// Upload Endpoint
const imgHandler = ((req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  let imageFile = req.files;
  // const file = req.files.file;

  imageFile.mv(`${__dirname}/controllers/${req.body.filename}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    // res.json({ fileName: file.name, filePath: `/controllers/${file.name}` });
  });
});

module.exports = {
    imgHandler: imgHandler

}