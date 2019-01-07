var express = require('express');
var router = express.Router();
var csrf = require('csurf');
passport = require('passport');  

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BoatHero' });
});

router.get('/signup', function(req, res, next) {
	var messages = req.flash('error');
	res.render('signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup', {
	successRedirect: '/profile',
	failureRedirect: '/signup',
	failureFlash: true
}));

router.get('/profile', function(req, res, next) {
	res.render('profile'); 
})

module.exports = router;
