var express = require('express');
var router = express.Router();
var wordDao = require('../data/dao/word.js');
router.post('/', function(req, res, next) {
    var keyword = req.body.keyword;
    wordDao.search(keyword).then((data) => {
    	console.log('search result:')
    	console.log(data);
        res.success(data);
    });
});

module.exports = router;