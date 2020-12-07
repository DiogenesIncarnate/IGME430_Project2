const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => {
  res.render('login', { csrfToken: req.csrfToken() });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

// generates a new password for the current session account
const passChange = (request, response) => {
  const req = request;
  const res = response;

  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;
  req.body.newPass = `${req.body.newPass}`;
  req.body.newPass2 = `${req.body.newPass2}`;

  // verify that all fields are present and valid
  if (
    !req.body.username
    || !req.body.pass
    || !req.body.newPass
    || !req.body.newPass2
  ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.newPass !== req.body.newPass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  // verify that the account you are changing the password for exists
  return Account.AccountModel.authenticate(
    username,
    password,
    (err, account) => {
      if (err || !account) {
        return res.status(401).json({ error: 'Wrong username or password' });
      }

      // generate a new hash for the new password
      Account.AccountModel.generateHash(req.body.newPass, (salt, hash) => {
        const query = { username: req.body.username };
        req.session.account.password = hash;
        req.session.account.salt = salt;

        // find the account by its username and update it with the new password hash and salt
        Account.AccountModel.findOneAndUpdate(
          query,
          req.session.account,
          { upsert: true },
          (updateErr) => {
            if (updateErr) return res.status(500).json({ error: updateErr });

            console.log(
              `Password changed from ${password} to ${req.body.newPass}`,
            );
            return res.json({ redirect: '/maker' });
          },
        );
      });

      return false;
    },
  );
};

const login = (request, response) => {
  const req = request;
  const res = response;
  // force cast to strings to cover some securuty flaws
  const username = `${req.body.username}`;
  const password = `${req.body.pass}`;

  if (!username || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  return Account.AccountModel.authenticate(
    username,
    password,
    (err, account) => {
      if (err || !account) {
        return res.status(401).json({ error: 'Wrong username or password' });
      }

      req.session.account = Account.AccountModel.toAPI(account);

      return res.json({ redirect: '/maker' });
    },
  );
};

const signup = (request, response) => {
  const req = request;
  const res = response;

  // cast to strings to cover up some security flaws
  req.body.username = `${req.body.username}`;
  req.body.pass = `${req.body.pass}`;
  req.body.pass2 = `${req.body.pass2}`;

  if (!req.body.username || !req.body.pass || !req.body.pass2) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (req.body.pass !== req.body.pass2) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
    const accountData = {
      username: req.body.username,
      salt,
      password: hash,
      isPremium: req.body.isPremium === 'on',
    };

    const newAccount = new Account.AccountModel(accountData);

    const savePromise = newAccount.save();

    savePromise.then(() => {
      req.session.account = Account.AccountModel.toAPI(newAccount);
      res.json({ redirect: '/maker' });
    });

    savePromise.catch((err) => {
      console.log(err);
      if (err.code === 11000) {
        return res.status(400).json({ error: 'Username already in use.' });
      }

      return res.status(400).json({ error: 'An error occurred' });
    });
  });
};

// returns all properties of the current session's account
const getAccountInfo = (request, response) => {
  const req = request;
  const res = response;

  return Account.AccountModel.findById(req.session.account._id, (err, acc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred.' });
    }

    return res.json({
      username: acc.username,
      isPremium: acc.isPremium,
      createdDate: acc.createdDate,
    });
  });
};

// gets only the premium status of the current account
const getPremiumStatus = (request, response) => {
  const req = request;
  const res = response;

  return Account.AccountModel.findById(req.session.account._id, (err, acc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred.' });
    }

    return res.json({ isPremium: acc ? acc.isPremium : false });
  });
};

const getToken = (request, response) => {
  const req = request;
  const res = response;

  const csrfJSON = {
    csrfToken: req.csrfToken(),
  };

  res.json(csrfJSON);
};

// changes the premium status, and in the future,
// any other account data based on the account info form
const changePremiumStatus = (request, response) => {
  const req = request;
  const res = response;

  const oldPremium = req.session.account.isPremium;
  console.log(`Premium is ${JSON.stringify(req.body)}`);
  req.session.account.isPremium = req.body.isPremium === 'on';
  const query = { _id: req.session.account._id };
  return Account.AccountModel.findOneAndUpdate(
    query,
    req.session.account,
    { upsert: true },
    (updateErr) => {
      if (updateErr) return res.status(500).json({ error: updateErr });

      console.log(
        `Premium status went from ${oldPremium} to ${req.session.account.isPremium}`,
      );
      return res.json({ redirect: '/maker' });
    },
  );
};

module.exports.loginPage = loginPage;
module.exports.passChange = passChange;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getPremiumStatus = getPremiumStatus;
module.exports.getAccountInfo = getAccountInfo;
module.exports.changePremiumStatus = changePremiumStatus;
module.exports.getToken = getToken;
