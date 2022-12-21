const router = require('express').Router();

const authRoutes = require('./auth');
const urlsRoutes = require('./urls');
const statsRoutes = require('./stats');


router.use('/auth', authRoutes);    // /auth/*     // routes used for authentication
router.use('/urls', urlsRoutes);    // /urls/*     // routes used for urls
router.use('/stats', statsRoutes);   // /stats/*     // routes used for stats

module.exports = router;