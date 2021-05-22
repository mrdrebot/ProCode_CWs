var express = require('express');
var router = express.Router();
const multer = require('multer');
const passport = require('passport');
const upload = multer();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('route / req session >>> ', req.session);
  res.send('base page');
});

router.post('/login', upload.none(), function(req, res, next) {
  passport.authenticate('local', function (err, user) {
    if(err) { return next(err) }
    if (!user) { return res.send('inncorect email or password!') }

    req.logIn(user, function (err) {
      if (err) { return next(err) };

      return res.redirect('/admin');
    });
  })(req, res, next);
});

const auth = (req, res, next) => {
  if(req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/');
  }
};

router.get('/admin', auth, (req, res) => {
  res.send('admin page');
});

router.post('/logout', function(req, res, next) {
  req.logOut();
  res.redirect('/');
});

module.exports = router;
