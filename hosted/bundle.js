"use strict";

var handleCharacter = function handleCharacter(e) {
  e.preventDefault();
  $("characterMessage").animate({
    width: "hide"
  }, 350);

  if ($("characterName").val() == "" || $("#characterAge").val() == "") {
    handleError("RAWR! All fields are required.");
    return false;
  }

  sendAjax("POST", $("#characterForm").attr("action"), $("#characterForm").serialize(), function () {
    loadCharactersFromServer();
  });
  return false;
};

var CharacterForm = function CharacterForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "characterForm",
    onSubmit: handleCharacter,
    name: "characterForm",
    action: "/maker",
    method: "POST",
    className: "characterForm"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "characterName",
    type: "text",
    name: "name",
    placeholder: "Character Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "age"
  }, "Age: "), /*#__PURE__*/React.createElement("input", {
    id: "characterAge",
    type: "text",
    name: "age",
    placeholder: "Character Age"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "race"
  }, "Race: "), /*#__PURE__*/React.createElement("select", {
    id: "characterRace",
    name: "race"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Dwarf"
  }, "Dwarf"), /*#__PURE__*/React.createElement("option", {
    value: "Elf"
  }, "Elf"), /*#__PURE__*/React.createElement("option", {
    value: "Halfling"
  }, "Halfling"), /*#__PURE__*/React.createElement("option", {
    value: "Human"
  }, "Human"), /*#__PURE__*/React.createElement("option", {
    value: "Dragonborn"
  }, "Dragonborn"), /*#__PURE__*/React.createElement("option", {
    value: "Gnome"
  }, "Gnome"), /*#__PURE__*/React.createElement("option", {
    value: "Half-Elf"
  }, "Half-Elf"), /*#__PURE__*/React.createElement("option", {
    value: "Half-Orc"
  }, "Half-Orc"), /*#__PURE__*/React.createElement("option", {
    value: "Tiefling"
  }, "Tiefling"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "className"
  }, "Class: "), /*#__PURE__*/React.createElement("select", {
    id: "characterClassName",
    name: "className"
  }, /*#__PURE__*/React.createElement("option", {
    value: "Barbarian"
  }, "Barbarian"), /*#__PURE__*/React.createElement("option", {
    value: "Bard"
  }, "Bard"), /*#__PURE__*/React.createElement("option", {
    value: "Cleric"
  }, "Cleric"), /*#__PURE__*/React.createElement("option", {
    value: "Druid"
  }, "Druid"), /*#__PURE__*/React.createElement("option", {
    value: "Fighter"
  }, "Fighter"), /*#__PURE__*/React.createElement("option", {
    value: "Monk"
  }, "Monk"), /*#__PURE__*/React.createElement("option", {
    value: "Paladin"
  }, "Paladin"), /*#__PURE__*/React.createElement("option", {
    value: "Ranger"
  }, "Ranger"), /*#__PURE__*/React.createElement("option", {
    value: "Rogue"
  }, "Rogue"), /*#__PURE__*/React.createElement("option", {
    value: "Sorcerer"
  }, "Sorcerer"), /*#__PURE__*/React.createElement("option", {
    value: "Warlock"
  }, "Warlock"), /*#__PURE__*/React.createElement("option", {
    value: "Wizard"
  }, "Wizard")), /*#__PURE__*/React.createElement("label", {
    htmlFor: "classLevel"
  }, "Class Level: "), /*#__PURE__*/React.createElement("input", {
    id: "classLevelField",
    name: "classLevel",
    type: "number",
    min: "1",
    max: "20"
  })), /*#__PURE__*/React.createElement("div", {
    id: "characterBaseAbilities"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "base_strength"
  }, "Strength: "), /*#__PURE__*/React.createElement("input", {
    name: "base_strength",
    type: "number",
    min: "1",
    max: "20"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "base_dexterity"
  }, "Dexterity: "), /*#__PURE__*/React.createElement("input", {
    name: "base_dexterity",
    type: "number",
    min: "1",
    max: "20"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "base_constitution"
  }, "Constitution: "), /*#__PURE__*/React.createElement("input", {
    name: "base_constitution",
    type: "number",
    min: "1",
    max: "20"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "base_wisdom"
  }, "Wisdom: "), /*#__PURE__*/React.createElement("input", {
    name: "base_wisdom",
    type: "number",
    min: "1",
    max: "20"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "base_charisma"
  }, "Charisma: "), /*#__PURE__*/React.createElement("input", {
    name: "base_charisma",
    type: "number",
    min: "1",
    max: "20"
  })), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeCharacterSubmit",
    type: "submit",
    value: "Make Character"
  }));
};

var CharacterList = function CharacterList(props) {
  if (props.characters.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "characterList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyCharacter"
    }, "No Characters yet"));
  }

  var characterNodes = props.characters.map(function (character) {
    return /*#__PURE__*/React.createElement("div", {
      key: character._id,
      className: "character"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/domoface.jpeg",
      alt: "domo face",
      className: "characterFace"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "characterName"
    }, "Name: ", character.name), /*#__PURE__*/React.createElement("h3", {
      className: "characterAge"
    }, "Age: ", character.age), /*#__PURE__*/React.createElement("h3", {
      className: "characterRace"
    }, "Race: ", character.race), /*#__PURE__*/React.createElement("h3", {
      className: "characterClassName"
    }, "Class: ", character.className, ", ", character.classLevel), /*#__PURE__*/React.createElement("h3", {
      className: "idField"
    }, "ID: ", character._id), /*#__PURE__*/React.createElement("div", {
      id: "characterAbilities"
    }, /*#__PURE__*/React.createElement("span", {
      className: "base_strength"
    }, "Str: ", character.base_strength), /*#__PURE__*/React.createElement("span", {
      className: "base_dexterity"
    }, "Dex: ", character.base_dexterity), /*#__PURE__*/React.createElement("span", {
      className: "base_constitution"
    }, "Con: ", character.base_constitution), /*#__PURE__*/React.createElement("span", {
      className: "base_wisdom"
    }, "Wis: ", character.base_wisdom), /*#__PURE__*/React.createElement("span", {
      className: "base_charisma"
    }, "Cha: ", character.base_charisma)));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "characterList"
  }, characterNodes);
};

var loadCharactersFromServer = function loadCharactersFromServer() {
  sendAjax("GET", "/getCharacters", null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
      characters: data.characters
    }), document.querySelector("#characters"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterForm, {
    csrf: csrf
  }), document.querySelector("#makeCharacter"));
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
    characters: []
  }), document.querySelector("#characters"));
  loadCharactersFromServer();
};

var getToken = function getToken() {
  sendAjax("GET", "/getToken", null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: 'json',
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
}; // saves rolls and sum of n number of d-sided dice


var rollDice = function rollDice(n, d) {
  var _rolls = [];

  for (var i = 0; i < n; i++) {
    var roll = Math.floor(Math.random() * d + 1);

    _rolls.push(roll);
  }

  var _sum = _rolls.reduce(function (a, b) {
    return a + b;
  }, 0);

  var results = {
    rolls: _rolls,
    sum: _sum
  };
  return results;
}; // follow algorithm for determining ability score


var rollForAbilityScore = function rollForAbilityScore() {
  var results = rollDice(4, 6);
  var _sum = results.sum;
  _sum -= Math.min.apply(Math, _toConsumableArray(results.rolls));
  return _sum;
};
