const passport = require('passport');
const router = require('./authRoutes');
const authController = require('../../controllers/authController');

router.get('/home', passport.authenticate('jwt', { session: false }), authController.home_get);
