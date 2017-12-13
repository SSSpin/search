var express = require('express');
var router = express.Router();
/* GET article data */
router.get('/:url', function(req, res, next) {
	console.log(req.params);
    res.redirect('http://'+req.params.url);
});
module.exports = router;
