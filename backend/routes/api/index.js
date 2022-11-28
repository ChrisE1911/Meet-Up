const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const groupsRouter = require('./groups.js');
const venuesRouter = require('./venue.js');
const eventsRouter = require('./events.js');
const groupImagesRouter = require('./group-images.js');
const eventImagesRouter = require('./event-images.js')


router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/groups', groupsRouter)

router.use('/users', usersRouter);

router.use('/venues', venuesRouter)

router.use('/events', eventsRouter);

router.use('/group-images', groupImagesRouter);

router.use('/event-images', eventImagesRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});
// backend/routes/api/index.js
// ...

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

  // ...

  // backend/routes/api/index.js
// ...

// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user });
});

// ...

// backend/routes/api/index.js
// ...

// GET /api/restore-user
router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

// GET /api/require-auth
const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

// ...


module.exports = router;
