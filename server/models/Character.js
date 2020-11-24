const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let CharacterModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setString = (str) => _.escape(str).trim();

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setString,
  },

  age: {
    type: Number,
    min: 0,
    required: true,
  },

  race: {
    type: String,
    required: true,
    trim: true,
    set: setString,
  },

  base_strength: {
    type: Number,
    min: 0,
    max: 20,
    required: true,
    default: 10,
  },
  base_dexterity: {
    type: Number,
    min: 0,
    max: 20,
    required: true,
    default: 10,
  },
  base_constitution: {
    type: Number,
    min: 0,
    max: 20,
    required: true,
    default: 10,
  },
  base_wisdom: {
    type: Number,
    min: 0,
    max: 20,
    required: true,
    default: 10,
  },
  base_charisma: {
    type: Number,
    min: 0,
    max: 20,
    required: true,
    default: 10,
  },

  className: {
    type: String,
    required: true,
    trim: true,
    set: setString,
  },

  classLevel: {
    type: Number,
    min: 1,
    max: 20,
    required: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

CharacterSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  race: doc.race,
  base_strength: doc.base_strength,
  base_dexterity: doc.base_dexterity,
  base_constitution: doc.base_constitution,
  base_wisdom: doc.base_wisdom,
  base_charisma: doc.base_charisma,
  className: doc.className,
  classLevel: doc.classLevel,
});

CharacterSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return CharacterModel.find(search)
    .select('name age race base_strength base_dexterity base_constitution base_wisdom base_charisma className classLevel')
    .lean()
    .exec(callback);
};

CharacterModel = mongoose.model('Character', CharacterSchema);

module.exports.CharacterModel = CharacterModel;
module.exports.CharacterSchema = CharacterSchema;
