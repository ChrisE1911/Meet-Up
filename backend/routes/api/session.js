// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

// backend/routes/api/session.js
// ...
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// ...

const router = express.Router();

// backend/routes/api/session.js
// ...

// Log in
router.post(
  '/',
  async (req, res, next) => {
    const { credential, password } = req.body;

    let user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    user = user.toJSON();

    // delete user['createdAt'];
    delete user['updatedAt'];
    // delete user['username'];

    // user.token = token;

    return res.json({
      user: user
    });
  }
);

// backend/routes/api/session.js
// ...

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// ...

// backend/routes/api/session.js
// ...

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    let { user } = req;

    if (user) {
      user = user.toJSON();

      // delete user['createdAt'];
      delete user['updatedAt']
    }

    return res.json({
      user: user
    });

  }
);

//   ...

//   backend/routes/api/session.js
// ...

//EDIT USER PROFILE INFORMATION

router.put('/edit', requireAuth, async (req, res, next) => {
  let { user } = req;

  if (user) {
    const { firstName, lastName, picture_url } = req.body;

    if (firstName) {
      user.firstName = firstName
    }
    if (lastName) {
      user.lastName = lastName
    }
    if (picture_url) {
      user.picture_url = picture_url
    }

  }
  user.save();

  res.json(await user)
})

//DELETE USER

router.delete('/delete-user', requireAuth, async (req, res, next) => {
  let { user } = req;

  if (user) {
    await user.destroy();
  }

  res.json({
    message: 'Successfully deleted User',
    statusCode: 200
  })
})

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

module.exports = router;
