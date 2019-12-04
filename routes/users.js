
const multer = require('multer');
var express = require('express');
var router = express.Router();
var query = require('../utils/db').query;

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

var upload = multer({ dest: 'uploads/' })
router.post('/uploader', upload.single('img'), (req, res, next) => {
  let file = req.file;
  console.log(file);
  res.json({ message: "OK", info: file.filename })
})


router.post('/wish', (req, res, next) => {
  var moment = require('moment');
  let body = req.body;
  let sql = "INSERT INTO wishes(name,nick,phone,email,content,img,inv,time) values (?,?,?,?,?,?,?,?)";
  let datetime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
  query(sql, [body.name, body.nick, body.phone, body.email, body.content, body.img, body.inv, datetime])
    .then((result) => {
      res.json({
        status: 0,
        message: "SUCCESS"
      })
    }).catch((err) => {
      res.json({
        status: 1,
        message: "SQL ERR"
      })
    });
})

module.exports = router;
