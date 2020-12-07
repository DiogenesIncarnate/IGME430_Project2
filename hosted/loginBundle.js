"use strict";

// sends the login form data to the server to login account controller
var handleLogin = function handleLogin(e) {
  e.preventDefault();
  $("#characterMessage").animate({
    width: "hide"
  }, 350);

  if ($("user").val() == "" || $("pass").val() == "") {
    handleError("RAWR! Username or password is empty.");
    return false;
  }

  console.log($("input[name=_csrf]").val());
  sendAjax("POST", $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  return false;
}; // sends signup form account data to be created in the account controller


var handleSignup = function handleSignup(e) {
  e.preventDefault();
  $("#characterMessage").animate({
    width: "hide"
  }, 350);

  if ($("username").val() == "" || $("#pass").val() == "" || $("#pass2").val() == "") {
    handleError("All fields are required.");
    return false;
  }

  if ($("#pass").val() != $("#pass2").val()) {
    handleError("Passwords do not match.");
    return false;
  }

  sendAjax("POST", $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
  return false;
}; // format login window react component


var LoginWindow = function LoginWindow(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "loginForm",
    name: "loginForm",
    onSubmit: handleLogin,
    action: "/login",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mainForm_Section"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "Username: "), /*#__PURE__*/React.createElement("input", {
    id: "user",
    type: "text",
    name: "username",
    placeholder: "Username"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mainForm_Section"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "Password"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mainForm_Section"
  }, /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Sign in"
  })));
}; // format signup window react component


var SignupWindow = function SignupWindow(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "signupForm",
    name: "signupForm",
    onSubmit: handleSignup,
    action: "/signup",
    method: "POST",
    className: "mainForm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mainForm_Section"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "username"
  }, "Username: "), /*#__PURE__*/React.createElement("input", {
    className: "mainForm_Value",
    id: "user",
    type: "text",
    name: "username",
    placeholder: "Username"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mainForm_Section"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass"
  }, "Password: "), /*#__PURE__*/React.createElement("input", {
    className: "mainForm_Value",
    id: "pass",
    type: "password",
    name: "pass",
    placeholder: "Password"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mainForm_Section"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "pass2"
  }, "Confirm Password: "), /*#__PURE__*/React.createElement("input", {
    className: "mainForm_Value",
    id: "pass2",
    type: "password",
    name: "pass2",
    placeholder: "Retype Password"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mainForm_Section"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "isPremium"
  }, "\"Purchase\" Premium Account: "), /*#__PURE__*/React.createElement("input", {
    className: "mainForm_Value",
    id: "isPremium",
    name: "isPremium",
    type: "checkbox"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mainForm_Section"
  }, /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit",
    type: "submit",
    value: "Sign Up"
  })));
};

var createLoginWindow = function createLoginWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

var createSignupWindow = function createSignupWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(SignupWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
}; // assigns default event handlers and react renders


var setup = function setup(csrf) {
  var loginButton = document.querySelector("#loginButton");
  var signupButton = document.querySelector("#signupButton");
  signupButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });
  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
  createLoginWindow(csrf); // default view
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
}; // Assumes your document using is `pt` units
// If you're using any other unit (mm, px, etc.) use this gist to translate: https://gist.github.com/AnalyzePlatypus/55d806caa739ba6c2b27ede752fa3c9c


function addWrappedText(_ref) {
  var text = _ref.text,
      textWidth = _ref.textWidth,
      doc = _ref.doc,
      _ref$fontSize = _ref.fontSize,
      fontSize = _ref$fontSize === void 0 ? 10 : _ref$fontSize,
      _ref$fontType = _ref.fontType,
      fontType = _ref$fontType === void 0 ? 'normal' : _ref$fontType,
      _ref$lineSpacing = _ref.lineSpacing,
      lineSpacing = _ref$lineSpacing === void 0 ? 7 : _ref$lineSpacing,
      _ref$xPosition = _ref.xPosition,
      xPosition = _ref$xPosition === void 0 ? 10 : _ref$xPosition,
      _ref$initialYPosition = _ref.initialYPosition,
      initialYPosition = _ref$initialYPosition === void 0 ? 10 : _ref$initialYPosition,
      _ref$pageWrapInitialY = _ref.pageWrapInitialYPosition,
      pageWrapInitialYPosition = _ref$pageWrapInitialY === void 0 ? 10 : _ref$pageWrapInitialY;
  doc.setFontType(fontType);
  doc.setFontSize(fontSize);
  var textLines = doc.splitTextToSize(text, textWidth); // Split the text into lines

  var pageHeight = doc.internal.pageSize.height; // Get page height, we'll use this for auto-paging. TRANSLATE this line if using units other than `pt`

  var cursorY = initialYPosition;
  textLines.forEach(function (lineText) {
    if (cursorY > pageHeight) {
      // Auto-paging
      doc.addPage();
      cursorY = pageWrapInitialYPosition;
    }

    doc.text(xPosition, cursorY, lineText);
    cursorY += lineSpacing;
  });
} // gets race ability bonuses given the D&D 5e API race object


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
