const router = require('express').Router();

const authRoutes = require('./auth');
const urlsRoutes = require('./urls');
const statsRoutes = require('./stats');
const usersRoutes = require('./users');

router.use('/auth', authRoutes);    // /auth/*     // routes used for authentication
router.use('/urls', urlsRoutes);    // /urls/*     // routes used for urls
router.use('/stats', statsRoutes);  // /stats/*    // routes used for stats
router.use('/users', usersRoutes);  // /users/*    // routes used for users

module.exports = router;