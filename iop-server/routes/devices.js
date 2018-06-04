var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    // For todays date;
  Date.prototype.today = function () {
      return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
  }

  // For the time now
  Date.prototype.timeNow = function () {
       return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
  }
  now = "" + new Date().today() + " " + new Date().timeNow();
  console.log(now);
  res.json([
    {id:1, last_update: now, nicename:"Spider Plant Monitor", online: true},
    {id:2, last_update: now, nicename:"English Ivy Monitor", online: false}
  ]);
});

module.exports = router;
