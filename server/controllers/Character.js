const models = require('../models');

const { Character } = models;

// render the app and its main content
const makerPage = (req, res) => {
  Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), characters: docs });
  });
};

// creates a new character and ties it to the current account
const makeCharacter = (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res
      .status(400)
      .json({ error: 'Both name and age are required' });
  }

  console.log(JSON.stringify(req.body));

  const characterData = {
    name: req.body.name,
    age: req.body.age,
    race: req.body.race,
    base_strength: req.body.base_strength,
    base_dexterity: req.body.base_dexterity,
    base_constitution: req.body.base_constitution,
    base_wisdom: req.body.base_wisdom,
    base_charisma: req.body.base_charisma,
    className: req.body.className,
    classLevel: req.body.classLevel,
    owner: req.session.account._id,
  };

  const newCharacter = Character.CharacterModel(characterData);

  const characterPromise = newCharacter.save();

  characterPromise.then(() => res.json({ redirect: '/maker' }));

  characterPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Character already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return characterPromise;
};

// get all characters for the current account
const getCharacters = (request, response) => {
  const req = request;
  const res = response;

  return Character.CharacterModel.findByOwner(
    req.session.account._id,
    (err, docs) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: 'An error occurred.' });
      }

      return res.json({ characters: docs });
    },
  );
};

module.exports.makerPage = makerPage;
module.exports.getCharacters = getCharacters;
module.exports.make = makeCharacter;
