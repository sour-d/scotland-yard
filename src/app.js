const express = require('express');
const morgan = require('morgan');

const { serveUsername } = require('./handlers/serveUsername.js');

const authLib = require('./handlers/authUsers.js');
const { signupHandler, protectedAuth } = authLib;
const { loginHandler, logoutHandler } = authLib;

const { validateAnchor } = require('./middlewares/validateAnchor.js');
const { hostGame } = require('./handlers/hostGame.js');
const { protectedLobby } = require('./middlewares/protectedLobby.js');

const pagesLib = require('./handlers/servePages.js');
const { serveLandingPage, serveSignupPage, serveLobby, serveLoginPage } = pagesLib;

const authValidators = require('./middlewares/authValidations.js');
const { credentialCheck, validateInput } = authValidators;

// app starts here --

const initApp = (config, users, games, session) => {
  const app = express();
  const { mode, views } = config;

  if (mode === 'dev') {
    app.use(morgan('tiny'));
  }
  app.use(session);
  app.use(express.urlencoded({ extended: true }));
  app.get('/', serveLandingPage(views));
  app.get('/user-name', serveUsername);

  app.get('/signup', protectedAuth, serveSignupPage(views));
  app.post('/signup', protectedAuth, credentialCheck, signupHandler(users));

  app.get('/host', validateAnchor, hostGame(games));
  app.get('/lobby/:gameId', protectedLobby, serveLobby(views))

  app.get('/login', protectedAuth, serveLoginPage(views));
  app.post('/login', protectedAuth, validateInput, loginHandler(users));
  app.get('/logout', logoutHandler);
  app.use(express.static('./public'));
  return app;
};

module.exports = { initApp };
