var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([
    {id:1, nicename:"Spider Plant Monitor", online: true},
    {id:2, nicename:"English Ivy Monitor", online: false}
  ]);
});

module.exports = router;
