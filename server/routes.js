var index = require('./controllers/index');
var article = require('./controllers/article');
var redirect = require('./controllers/redirect');
var search = require('./controllers/search');
var init = require('./controllers/init');
var word = require('./controllers/word');
var login = require('./controllers/login');
var register = require('./controllers/register');
var audit = require('./controllers/audit');
var  user = require('./controllers/user');
module.exports = {
    '/': index,
    '/search': search,
    '/init': init,
    '/word': word,
    '/login': login,
    '/register': register,
    '/audit': audit,
    '/user':user
};