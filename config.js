/* eslint-disable max-len */

if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.js` from inside the client-side code.',
  );
}

module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,

  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy: process.env.TRUST_PROXY || 'loopback',

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl:
      process.env.API_SERVER_URL
      || `http://localhost:${process.env.PORT || 3000}`,
  },

  // Database
  databaseUrl: process.env.DATABASE_URL || 'sqlite:database.sqlite',

  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },

    // https://cloud.google.com/console/project
    google: {
      id:
        process.env.GOOGLE_CLIENT_ID
        || '739023691386-uv712u0r3c63ep54d098d4obilin0402.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'EqClfyd5XR_B1B0qTUubabpu',
      returnUrl:
        process.env.GOOGLE_CLIENT_URL
        || 'http://localhost:3000/login/google/return',
    },
  },
};
