var express = require('express');
var router = express.Router();

const T = 81234000; // not quite a full day

/* GET users listing. */
router.get('/', function(req, res, next) {

  now = new Date().toLocaleString();

  res.json([
    {id:1, last_update: now, nicename:"Spider Plant Monitor", online: true},
    {id:2, last_update: now, nicename:"English Ivy Monitor", online: false}
  ]);
});

router.get('/1', function(req, res, next) {
  now = new Date();
  res.json([
    {timestamp: new Date(now.getTime() - T * 0).toLocaleString(), temperature: 32.3, humidity: 73.1},
    {timestamp: new Date(now.getTime() - T * 1).toLocaleString(), temperature: 32.5, humidity: 54.2},
    {timestamp: new Date(now.getTime() - T * 2).toLocaleString(), temperature: 29.0, humidity: 92.6},
    {timestamp: new Date(now.getTime() - T * 3).toLocaleString(), temperature: 31.5, humidity: 27.7},
    {timestamp: new Date(now.getTime() - T * 4).toLocaleString(), temperature: 34.4, humidity: 62.3},
    {timestamp: new Date(now.getTime() - T * 5).toLocaleString(), temperature: 35.3, humidity: 67.2},
  ]);
});

router.get('/2', function(req, res, next) {
  now = new Date();
  res.json([
    {timestamp: new Date(now.getTime() - T * 0).toLocaleString(), temperature: 32.3, humidity: 73.1},
    {timestamp: new Date(now.getTime() - T * 1).toLocaleString(), temperature: 32.5, humidity: 54.2},
    {timestamp: new Date(now.getTime() - T * 2).toLocaleString(), temperature: 29.0, humidity: 92.6},
    {timestamp: new Date(now.getTime() - T * 3).toLocaleString(), temperature: 31.5, humidity: 27.7},
    {timestamp: new Date(now.getTime() - T * 4).toLocaleString(), temperature: 34.4, humidity: 62.3},
    {timestamp: new Date(now.getTime() - T * 5).toLocaleString(), temperature: 35.3, humidity: 67.2},
  ]);
});

module.exports = router;
