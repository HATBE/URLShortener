const router = require('express').Router();

const authRoutes = require('./auth');
const urlsRoutes = require('./urls');

router.use('/auth', authRoutes); // /auth/*     // routes used for authentication
router.use('/urls', urlsRoutes); // /urls/*     // routes used for urls

module.exports = router;