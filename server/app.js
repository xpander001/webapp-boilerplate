require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const next = require('next');
const expressJwt = require('express-jwt');
const config = require('../config');
const passport = require('../passport');
const authRoutes = require('../auth/routes');
const models = require('../data/models');

const Jwt401Error = expressJwt.UnauthorizedError;

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.use(cookieParser());

    //
    // Authentication
    // -----------------------------------------------------------------------------
    server.use(
      expressJwt({
        secret: config.auth.jwt.secret,
        credentialsRequired: false,
        getToken: req => req.cookies.id_token,
      }),
    );
    // Error handler for express-jwt
    server.use((err, req, res, expressNext) => {
      // eslint-disable-line no-unused-vars
      if (err instanceof Jwt401Error) {
        // `clearCookie`, otherwise user can't use web-app until cookie expires
        res.clearCookie('id_token');
      }
      expressNext(err);
    });

    server.use(passport.initialize());
    authRoutes(server);

    server.get('*', (req, res) => handle(req, res));
    models.sync().catch(err => console.error(err.stack)); // eslint-disable-line
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line
    });
  });
