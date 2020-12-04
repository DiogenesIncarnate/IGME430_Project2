"use strict";

var handleCharacter = function handleCharacter(e) {
  e.preventDefault();
  $("characterMessage").animate({
    width: "hide"
  }, 350);

  if ($("characterName").val() == "" || $("#characterAge").val() == "") {
    handleError("All fields are required.");
    return false;
  }

  sendAjax("POST", $("#characterForm").attr("action"), $("#characterForm").serialize(), function () {
    loadCharactersFromServer();
  });
  return false;
};

var handlePassChange = function handlePassChange(e) {
  e.preventDefault();
  $("#characterMessage").animate({
    width: "hide"
  }, 350);

  if ($("username").val() == "" || $("#pass").val() == "" || $("#newPass").val() == "" || $("#newPass2").val() == "") {
    handleError("All fields are required.");
    return false;
  }

  if ($("#newPass").val() != $("#newPass2").val()) {
    handleError("RAWR! Passwords do not match.");
    return false;
  }

  sendAjax("POST", $("#passChangeForm").attr("action"), $("#passChangeForm").serialize(), redirect);
};

var saveCharacter = function saveCharacter(e) {
  e.preventDefault();
  sendAjax("POST", $("#".concat(e.target.id)).attr("action"), $("#".concat(e.target.id)).serialize(), redirect);
};

var CharacterForm = function CharacterForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "characterForm",
    onSubmit: handleCharacter,
    name: "characterForm",
    action: "/maker",
    method: "POST",
    className: "characterForm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "characterForm_Section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "characterForm_Section_Item"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "characterName",
    type: "text",
    name: "name",
    placeholder: "Name"
  })), /*#__PURE__*/React.createElement("div", {
    className: "characterForm_Section_Item"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "age"
  }, "Age: "), /*#__PURE__*/React.createElement("input", {
    id: "characterAge",
    type: "number",
    name: "age",
    placeholder: "Age"
  })), /*#__PURE__*/React.createElement("div", {
    className: "characterForm_Section_Item"
  }, /*#__PURE__*/React.createElement("label", {
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
  }, "Tiefling")))), /*#__PURE__*/React.createElement("div", {
    className: "characterForm_Section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "characterForm_Section_Item"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "className"
  }, "Class: "), /*#__PURE__*/React.createElement("select", {
    id: "characterClassName",
    name: "className",
    placeholder: "Class"
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
  }, "Wizard"))), /*#__PURE__*/React.createElement("div", {
    className: "characterForm_Section_Item"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "classLevel"
  }, "Class Level: "), /*#__PURE__*/React.createElement("input", {
    id: "classLevelField",
    name: "classLevel",
    type: "number",
    placeholder: "LVL",
    min: "1",
    max: "20"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "characterForm_Section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "characterForm_Section_Item"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "base_strength"
  }, "Strength: "), /*#__PURE__*/React.createElement("input", {
    name: "base_strength",
    type: "number",
    min: "1",
    max: "20"
  })), /*#__PURE__*/React.createElement("div", {
    className: "characterForm_Section_Item"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "base_dexterity"
  }, "Dexterity: "), /*#__PURE__*/React.createElement("input", {
    name: "base_dexterity",
    type: "number",
    min: "1",
    max: "20"
  })), /*#__PURE__*/React.createElement("div", {
    className: "characterForm_Section_Item"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "base_constitution"
  }, "Constitution: "), /*#__PURE__*/React.createElement("input", {
    name: "base_constitution",
    type: "number",
    min: "1",
    max: "20"
  })), /*#__PURE__*/React.createElement("div", {
    className: "characterForm_Section_Item"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "base_wisdom"
  }, "Wisdom: "), /*#__PURE__*/React.createElement("input", {
    name: "base_wisdom",
    type: "number",
    min: "1",
    max: "20"
  })), /*#__PURE__*/React.createElement("div", {
    className: "characterForm_Section_Item"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "base_charisma"
  }, "Charisma: "), /*#__PURE__*/React.createElement("input", {
    name: "base_charisma",
    type: "number",
    min: "1",
    max: "20"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "characterForm_Section"
  }, /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeCharacterSubmit",
    type: "submit",
    value: "Make Character"
  })));
};

var CharacterList = function CharacterList(props) {
  if (props.characters.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "characterList"
    }, /*#__PURE__*/React.createElement("div", {
      className: "characterNode_Section"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyCharacter"
    }, "No Characters yet")));
  }

  var characterNodes = props.characters.map(function (character) {
    return /*#__PURE__*/React.createElement("form", {
      id: character._id,
      onSubmit: saveCharacter,
      name: "character",
      action: "/saveCharacter",
      method: "POST",
      className: "character"
    }, /*#__PURE__*/React.createElement("div", {
      className: "characterNode_Section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "characterNode_Section_Item"
    }, /*#__PURE__*/React.createElement("div", {
      id: "characterName"
    }, "Name: ", character.name)), /*#__PURE__*/React.createElement("div", {
      className: "characterNode_Section_Item"
    }, /*#__PURE__*/React.createElement("div", {
      id: "characterAge"
    }, "Age: ", character.age)), /*#__PURE__*/React.createElement("div", {
      className: "characterNode_Section_Item"
    }, /*#__PURE__*/React.createElement("div", {
      id: "characterRace"
    }, "Race: ", character.race)), /*#__PURE__*/React.createElement("div", {
      className: "characterNode_Section_Item"
    }, /*#__PURE__*/React.createElement("div", {
      id: "characterClassName"
    }, "Class: ", character.className, ", ", character.classLevel))), /*#__PURE__*/React.createElement("div", {
      id: "characterNode_Section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "characterNode_Section_Item"
    }, /*#__PURE__*/React.createElement("div", {
      id: "base_strength"
    }, "Str:", " ", character.base_strength + props.dndData[character.race].str_bonus, " ", "(", character.base_strength, " +", props.dndData[character.race].str_bonus, ")")), /*#__PURE__*/React.createElement("div", {
      className: "characterNode_Section_Item"
    }, /*#__PURE__*/React.createElement("div", {
      id: "base_dexterity"
    }, "Dex:", " ", character.base_dexterity + props.dndData[character.race].dex_bonus, " ", "(", character.base_dexterity, " +", props.dndData[character.race].dex_bonus, ")")), /*#__PURE__*/React.createElement("div", {
      className: "characterNode_Section_Item"
    }, /*#__PURE__*/React.createElement("div", {
      id: "base_constitution"
    }, "Con:", " ", character.base_constitution + props.dndData[character.race].con_bonus, " ", "(", character.base_constitution, " +", props.dndData[character.race].con_bonus, ")")), /*#__PURE__*/React.createElement("div", {
      className: "characterNode_Section_Item"
    }, /*#__PURE__*/React.createElement("div", {
      id: "base_wisdom"
    }, "Wis:", " ", character.base_wisdom + props.dndData[character.race].wis_bonus, " ", "(", character.base_wisdom, " +", props.dndData[character.race].wis_bonus, ")")), /*#__PURE__*/React.createElement("div", {
      className: "characterNode_Section_Item"
    }, /*#__PURE__*/React.createElement("div", {
      id: "base_charisma"
    }, "Cha:", " ", character.base_charisma + props.dndData[character.race].cha_bonus, " ", "(", character.base_charisma, " +", props.dndData[character.race].cha_bonus, ")"))), /*#__PURE__*/React.createElement("div", {
      className: "characterNode_Section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "characterNode_Section_Item"
    }, /*#__PURE__*/React.createElement("div", {
      id: "idField"
    }, "ID: ", character._id)), /*#__PURE__*/React.createElement("div", {
      className: "characterNode_Section_Item"
    }, /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      type: "submit",
      value: "Export to PDF"
    }))));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "characterList"
  }, characterNodes);
};

var PassChangeWindow = function PassChangeWindow(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "passChangeForm",
    name: "passChangeForm",
    onSubmit: handlePassChange,
    action: "/passChange",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "Username: "), /*#__PURE__*/React.createElement("input", {
    id: "user",
    type: "text",
    name: "username",
    placeholder: "Username"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "Old Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "Old Password"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "newPass"
  }, "New Password: "), /*#__PURE__*/React.createElement("input", {
    id: "newPass",
    type: "password",
    name: "newPass",
    placeholder: "New Password"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "newPass2"
  }, "Confirm New Password: "), /*#__PURE__*/React.createElement("input", {
    id: "newPass2",
    type: "password",
    name: "newPass2",
    placeholder: "Retype New Password"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Confirm Change"
  }));
};

var createPassChangeWindow = function createPassChangeWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(PassChangeWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

var loadCharactersFromServer = function loadCharactersFromServer(csrf) {
  sendAjax("GET", "/getCharacters", null, function (data) {
    var results = [];
    var classes = [];
    var races = []; // race and class data that needs to be fetched

    for (var i = 0; i < data.characters.length; i++) {
      if (!classes.includes(data.characters[i].className)) classes.push(data.characters[i].className);
      if (!races.includes(data.characters[i].race)) races.push(data.characters[i].race);
    } // collect promises from api calls


    var promises = [];
    classes.forEach(function (c) {
      promises.push(sendAjax("GET", "https://www.dnd5eapi.co/api/classes/".concat(c.toLowerCase()), null, function (res) {
        results[res.name] = res;
      }));
    });
    races.forEach(function (r) {
      promises.push(sendAjax("GET", "https://www.dnd5eapi.co/api/races/".concat(r.toLowerCase()), null, function (res) {
        results[res.name] = res;
        results[res.name]["str_bonus"] = getDND_Race_AB(results[res.name], "str");
        results[res.name]["dex_bonus"] = getDND_Race_AB(results[res.name], "dex");
        results[res.name]["con_bonus"] = getDND_Race_AB(results[res.name], "con");
        results[res.name]["wis_bonus"] = getDND_Race_AB(results[res.name], "wis");
        results[res.name]["cha_bonus"] = getDND_Race_AB(results[res.name], "cha");
      }));
    }); // load character list after all promises are fulfilled

    $.when.apply(null, promises).then(function () {
      ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
        csrf: csrf,
        dndData: results,
        characters: data.characters
      }), document.querySelector("#characters"));
    });
  });
};

var setup = function setup(csrf) {
  var passChangeButton = document.querySelector("#passChangeButton");
  passChangeButton.addEventListener("click", function (e) {
    e.preventDefault();
    createPassChangeWindow(csrf);
    return false;
  });
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterForm, {
    csrf: csrf
  }), document.querySelector("#makeCharacter"));
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
    dndData: true,
    characters: []
  }), document.querySelector("#characters"));
  loadCharactersFromServer(csrf);
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
  $("#characterMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#characterMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  return $.ajax({
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
};

var getDND_Race_AB = function getDND_Race_AB(raceAPI, ability) {
  var bonus = 0;
  raceAPI.ability_bonuses.forEach(function (ab) {
    if (ab.ability_score.index === ability) bonus = ab.bonus;
  });
  return bonus;
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
