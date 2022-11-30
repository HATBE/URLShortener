const router = require('express').Router();

const authRoutes = require('./auth');
const urlsRoutes = require('./urls');

router.use('/auth', authRoutes); // /auth/*     // Routes used for authentication
router.use('/urls', urlsRoutes); // /urls/*     // Routes used for urls

module.exports = router;