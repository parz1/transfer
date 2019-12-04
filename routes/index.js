var express = require('express');
var router = express.Router();
var request = require('request');
var CryptoJS = require('crypto-js');
var fs = require('fs');
var query = require('../utils/db').query;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/loadimg/:name', (req, res, next) => {
  const rs = fs.createReadStream('uploads/' + req.params.name);
  rs.pipe(res);
})


router.get('/weather', function (req, res, next) {
  let lng = req.query.lng ? req.query.lng : 120;
  let lag = req.query.lag ? req.query.lng : 30;
  let url = 'https://api.caiyunapp.com/v2.4/TAkhjf8d1nlSlspN/' + lng + ',' + lag + '/realtime.json';
  request({
    url: url,
    method: 'GET',
    headers: { 'Content-Type': 'text/json' }
  }, function (err, response, body) {
    if (!err) {
      res.json({ 'data': JSON.parse(body) });
    }
  })
})

router.get('/wish', (req, res, next) => {
  let sql = "SELECT * from wishes";
  query(sql, [])
    .then((result) => {
      res.json({ status: 0, data: result })
    }).catch((err) => {
      console.log(err);
    });
})

module.exports = router;
