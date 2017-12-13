var express = require('express');
var router = express.Router();
var proxy = require('../proxy/proxy');
router.get('/', function(req, res, next) {
  res.success([{
    id: '123123123'
  }, {
    id: '345234234'
  }]);
});
router.get('/:articleId', function(req, res, next) {
  if (req.params.articleId == 'asd') {
    proxy.Get('/product/category/list', {}).then(function(r) {
      res.error(r);
    });
  } else {
    res.success({
      id: req.params.articleId
    });
  }
});
module.exports = router;
