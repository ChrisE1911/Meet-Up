// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

// backend/routes/api/users.js
// ...
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// ...

const router = express.Router();

// backend/routes/api/users.js
// ...
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];


// backend/routes/api/users.js
// ...

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { firstName, lastName, email, password, username, picture_url } = req.body;
    let user = await User.signup({ firstName, lastName, email, username, password, picture_url });

   await setTokenCookie(res, user);

    user = user.toJSON();

    

    delete user['updatedAt']


    return res.json({
      user: user
    });
  }
);


//Add an image to profile

router.post('/edit', requireAuth, async (req, res, next) => {
  let { user } = req;

  const { url, preview } = req.body;

  let newImage = await ProfileImage.create({
      preview,
      url,
      userId: user.id
  })

  newImage = newImage.toJSON();

  res.json(newImage)
})


module.exports = router;
