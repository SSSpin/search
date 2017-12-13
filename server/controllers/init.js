var express = require('express');
var router = express.Router();
var excelService = require('../services/excel.service.js');
var wordDao = require('../data/dao/word.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('init');
    var data = excelService.read(process.cwd() + '/origin.xlsx');
    wordDao.insert(data, true);
});

module.exports = router;