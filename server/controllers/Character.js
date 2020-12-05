const pdfcrowd = require('pdfcrowd');
const models = require('../models');
// create the API client instance
const client = new pdfcrowd.HtmlToPdfClient(
  'DiogenesIncarnate',
  '87175f7efd2c7a12266402f3ed8ebb68',
);

const { Character } = models;

const makerPage = (req, res) => {
  Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), characters: docs });
  });
};

const saveCharacter = (request, response) => {
  const req = request;
  const res = response;

  // configure the conversion
  try {
    client.setDataString(JSON.stringify(req.body));
  } catch (why) {
  // report the error
    console.error(`Pdfcrowd Error: ${why}`);
    process.exit(1);
  }

  console.log(JSON.stringify(req.body));
  // run the conversion and write the result to a file
  client.convertStringToFile(
    'Name: {{ name }}, Age: {{ age }}, Race: {{ race }}, Class: {{ className }}',
    'output.pdf',
    (err, fileName) => {
      if (err) return console.error(`Pdfcrowd Error: ${err}`);
      console.log(`Success: the file was created ${fileName}`);
      return res.status(200).json({ success: 'Exported PDF to file!' });
    },
  );
};

const makeCharacter = (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res
      .status(400)
      .json({ error: 'RAWR! Both name and age are required' });
  }

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

  saveCharacter(req, res);

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
module.exports.saveCharacter = saveCharacter;
