const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config');

const { auth } = config;

const googleAuth = (app) => {
  app.get('/me', (req, res) => (req.user ? res.json({
    id: req.user.id,
    email: req.user.email,
  }) : res.json({})));
  app.get(
    '/login/google',
    passport.authenticate('google', {
      scope: ['email', 'profile'],
      session: false,
    }),
  );

  app.get(
    '/login/google/return',
    passport.authenticate('google', {
      failureRedirect: '/login',
      session: false,
    }),
    (req, res) => {
      const user = {
        id: req.user.id,
        email: req.user.email,
      };
      const expiresIn = 60 * 60 * 24 * 180; // 180 days
      const token = jwt.sign(user, auth.jwt.secret, { expiresIn });
      res.cookie('id_token', token, {
        maxAge: 1000 * expiresIn,
        httpOnly: true,
      });
      res.redirect('/');
    },
  );
};

module.exports = googleAuth;
