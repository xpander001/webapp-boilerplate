const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModels = require('../data/models');
const config = require('../config').auth;

const { UserProfile } = userModels;
const { UserClaim } = userModels;
const { UserLogin } = userModels;
const { User } = userModels;

const validateAccount = domain => domain === 'andersuarez.com';

/**
 * Sign in with Facebook.
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.id,
      clientSecret: config.google.secret,
      callbackURL: config.google.returnUrl,
      profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
    },
    (req, accessToken, refreshToken, profile, done) => {
      if (
        !profile
        || !profile._json // eslint-disable-line no-underscore-dangle
        || !validateAccount(profile._json.domain) // eslint-disable-line no-underscore-dangle
      ) {
        done(null);
      }
      /* eslint-disable no-underscore-dangle */
      const loginName = 'google';
      const claimType = 'urn:google:access_token';
      const fooBar = async () => {
        if (req.user) {
          const userLogin = await UserLogin.findOne({
            attributes: ['name', 'key'],
            where: { name: loginName, key: profile.id },
          });

          if (userLogin) {
            // Sign in with that account or delete it, then link it with your current account.
            done();
          } else {
            const user = await User.create(
              {
                id: req.user.id,
                email: profile.email,
                logins: [{ name: loginName, key: profile.id }],
                claims: [{ type: claimType, value: profile.id }],
                profile: {
                  displayName: profile.displayName,
                  gender: profile._json.gender,
                  picture: profile._json.image.url,
                },
              },
              {
                include: [
                  { model: UserLogin, as: 'logins' },
                  { model: UserClaim, as: 'claims' },
                  { model: UserProfile, as: 'profile' },
                ],
              },
            );
            done(null, {
              id: user.id,
              email: user.email,
            });
          }
        } else {
          const users = await User.findAll({
            attributes: ['id', 'email'],
            where: { '$logins.name$': loginName, '$logins.key$': profile.id },
            include: [
              {
                attributes: ['name', 'key'],
                model: UserLogin,
                as: 'logins',
                required: true,
              },
            ],
          });
          if (users.length) {
            done(null, users[0]);
          } else {
            let user = await User.findOne({
              where: { email: profile._json.email },
            });
            if (user) {
              // There is already an account using this email address. Sign in to
              // that account and link it with Facebook manually from Account Settings.
              done(null);
            } else {
              user = await User.create(
                {
                  email: profile.email,
                  emailVerified: true,
                  logins: [{ name: loginName, key: profile.id }],
                  claims: [{ type: claimType, value: accessToken }],
                  profile: {
                    displayName: profile.displayName,
                    gender: profile._json.gender,
                    picture: profile._json.image.url,
                  },
                },
                {
                  include: [
                    { model: UserLogin, as: 'logins' },
                    { model: UserClaim, as: 'claims' },
                    { model: UserProfile, as: 'profile' },
                  ],
                },
              );
              done(null, {
                id: user.id,
                email: user.email,
              });
            }
          }
        }
      };

      fooBar().catch(done);
    },
  ),
);

module.exports = passport;
