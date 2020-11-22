const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let DomoModel = {};

// mongoose.Types.ObjectID is a function that
// converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setString = (str) => _.escape(str).trim();

const classSchema = new mongoose.Schema({
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
  }
});

const spellSchema = new mongoose.Schema({
  spellName: {
    type: String,
    required: true,
    trim: true,
    set: setString,
  },
});

const DomoSchema = new mongoose.Schema({
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

  baseAbilities: {
    strength: {
      type: Number,
      min: 0,
      max: 20,
      required: true,
      default: 10,
    },
    dexterity: {
      type: Number,
      min: 0,
      max: 20,
      required: true,
      default: 10,
    },
    consitution: {
      type: Number,
      min: 0,
      max: 20,
      required: true,
      default: 10,
    },
    wisdom: {
      type: Number,
      min: 0,
      max: 20,
      required: true,
      default: 10,
    },
    charisma: {
      type: Number,
      min: 0,
      max: 20,
      required: true,
      default: 10,
    },
  },

  classes: {
    type: [classSchema],
  },

  spells: {
    type: [spellSchema],
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

DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
  race: doc.race,
  baseAbilities: doc.baseAbilities,
  classes: doc.classes,
  spells: doc.spells,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return DomoModel.find(search).select('name age race baseAbilities classes spells').lean().exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
