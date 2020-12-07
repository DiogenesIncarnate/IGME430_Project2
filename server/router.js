const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getCharacters', mid.requiresLogin, controllers.Character.getCharacters);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  // app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.post('/passChange', mid.requiresLogin, controllers.Account.passChange);
  app.get('/getPremiumStatus', mid.requiresSecure, controllers.Account.getPremiumStatus);
  app.get('/getAccountInfo', mid.requiresLogin, controllers.Account.getAccountInfo);
  app.post('/changePremiumStatus', mid.requiresLogin, controllers.Account.changePremiumStatus);
  app.get('/maker', mid.requiresLogin, controllers.Character.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Character.make);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
