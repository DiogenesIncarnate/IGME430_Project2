// sends character form data to be added to character models
const handleCharacter = (e) => {
  e.preventDefault();

  $("#characterMessage").animate({ width: "hide" }, 350);

  if ($("#characterName").val() == "" || $("#characterAge").val() == "") {
    handleError("All fields are required.");
    return false;
  }

  sendAjax(
    "POST",
    e.target.getAttribute("action"),
    $("#characterForm").serialize(),
    function () {
      loadCharactersFromServer($("#characterForm")._csrf);
    }
  );

  return false;
};

// send new password info to account controller to be updated
const handlePassChange = (e) => {
  e.preventDefault();

  $("#characterMessage").animate({ width: "hide" }, 350);

  if (
    $("username").val() == "" ||
    $("#pass").val() == "" ||
    $("#newPass").val() == "" ||
    $("#newPass2").val() == ""
  ) {
    handleError("All fields are required.");
    return false;
  }

  if ($("#newPass").val() != $("#newPass2").val()) {
    handleError("Passwords do not match.");
    return false;
  }

  sendAjax(
    "POST",
    $("#passChangeForm").attr("action"),
    $("#passChangeForm").serialize(),
    redirect
  );
};

// send account info (premium) to be edited
const handleAccountInfo = (e) => {
  e.preventDefault();

  if (document.querySelector("#accountChanged").value === "true") {
    sendAjax(
      "POST",
      $("#accountForm").attr("action"),
      $("#accountForm").serialize(),
      redirect
    );
  }
};

// format and export pdf using JS library
const exportToPDF = (e) => {
  e.preventDefault();

  const character = e.target.closest(".character");

  var eh = {
    "#languages": function (element, renderer) {
      return true;
    },
    "#misc": function (element, renderer) {
      return true;
    },
  };
  let docW = 210;
  const doc = new jsPDF([300, docW]);
  let lMargin = 15,
    rMargin = 15;
  doc.setProperties({
    title: `CharacterSheet_${character
      .querySelector("#characterName")
      .textContent.substring(6)}_${character.id}`,
  });
  doc.fromHTML(character, lMargin, rMargin, { elementHandlers: eh });
  addWrappedText({
    text: character.querySelector("#languages").textContent,
    doc: doc,
    textWidth: docW - rMargin * 2,
    initialYPosition: 100,
    xPosition: lMargin,
  });
  doc.setFontSize(10);
  window.open(doc.output("bloburl"));
};

// set the form values of all character form ability scores
const rollAbilities = () => {
  const form = document.querySelector("#characterForm");
  form.querySelectorAll(".ability_score").forEach((abs) => {
    let score = rollForAbilityScore();
    abs.setAttribute('value', score);
    abs.value = score;
  });
};

// format react component for the character form
const CharacterForm = (props) => {
  return (
    <form
      id="characterForm"
      onSubmit={handleCharacter}
      name="characterForm"
      action="/maker"
      method="POST"
      className="characterForm"
    >
      <div className="characterForm_Section">
        <div className="characterForm_Section_Item">
          <label htmlFor="name">Name: </label>
          <input
            id="characterName"
            type="text"
            name="name"
            placeholder="Name"
          />
        </div>
        <div className="characterForm_Section_Item">
          <label htmlFor="age">Age: </label>
          <input id="characterAge" type="number" name="age" placeholder="Age" />
        </div>
        <div className="characterForm_Section_Item">
          <label htmlFor="race">Race: </label>
          <select id="characterFormRace" name="race">
            <option value="Dwarf">Dwarf</option>
            <option value="Elf">Elf</option>
            <option value="Halfling">Halfling</option>
            <option value="Human">Human</option>
            <option value="Dragonborn">Dragonborn</option>
            <option value="Gnome">Gnome</option>
            <option value="Half-Elf">Half-Elf</option>
            <option value="Half-Orc">Half-Orc</option>
            <option value="Tiefling">Tiefling</option>
          </select>
        </div>
      </div>
      <div className="characterForm_Section">
        <div className="characterForm_Section_Item">
          <label htmlFor="className">Class: </label>
          <select
            id="characterFormClassName"
            name="className"
            placeholder="Class"
          >
            <option value="Barbarian">Barbarian</option>
            <option value="Bard">Bard</option>
            <option value="Cleric">Cleric</option>
            <option value="Druid">Druid</option>
            <option value="Fighter">Fighter</option>
            <option value="Monk">Monk</option>
            <option value="Paladin">Paladin</option>
            <option value="Ranger">Ranger</option>
            <option value="Rogue">Rogue</option>
            <option value="Sorcerer">Sorcerer</option>
            <option value="Warlock">Warlock</option>
            <option value="Wizard">Wizard</option>
          </select>
        </div>
        <div className="characterForm_Section_Item">
          <label htmlFor="classLevel">Class Level: </label>
          <input
            id="classLevelField"
            name="classLevel"
            type="number"
            placeholder="LVL"
            min="1"
            max="20"
          />
        </div>
      </div>
      <div className="characterForm_Section">
        <div className="characterForm_Section_Item">
          <label htmlFor="base_strength">Strength: </label>
          <input
            className="ability_score"
            name="base_strength"
            type="number"
            min="1"
            max="20"
          />
        </div>
        <div className="characterForm_Section_Item">
          <label htmlFor="base_dexterity">Dexterity: </label>
          <input
            className="ability_score"
            name="base_dexterity"
            type="number"
            min="1"
            max="20"
          />
        </div>
        <div className="characterForm_Section_Item">
          <label htmlFor="base_constitution">Constitution: </label>
          <input
            className="ability_score"
            name="base_constitution"
            type="number"
            min="1"
            max="20"
          />
        </div>
        <div className="characterForm_Section_Item">
          <label htmlFor="base_wisdom">Wisdom: </label>
          <input
            className="ability_score"
            name="base_wisdom"
            type="number"
            min="1"
            max="20"
          />
        </div>
        <div className="characterForm_Section_Item">
          <label htmlFor="base_charisma">Charisma: </label>
          <input
            className="ability_score"
            name="base_charisma"
            type="number"
            min="1"
            max="20"
          />
        </div>
      </div>
      <div className="characterForm_Section">
        <div className="characterForm_Section_Item">
          <button className="btn" type="button" id="rollScoresBtn">
            Roll Ability Scores
          </button>
        </div>
        <input type="hidden" name="_csrf" value={props.csrf} />
        <div className="characterForm_Section_Item">
          <input
            className="makeCharacterSubmit btn"
            type="submit"
            action="/maker"
            value="Make Character"
          />
        </div>
      </div>
    </form>
  );
};

// renders all of the account's characters
const CharacterList = function (props) {
  if (props.characters.length === 0) {
    return (
      <div className="characterList">
        <div className="characterNode_Section">
          <h3 className="emptyCharacter">No Characters yet</h3>
        </div>
      </div>
    );
  }

  const characterNodes = props.characters.map(function (character) {
    const languages = [];
    props.dndData[character.race]["languages"].forEach((lang) => {
      languages.push(<li>{lang["name"]}</li>);
    });
    return (
      <form
        id={character._id}
        onSubmit={exportToPDF}
        name="character"
        method="POST"
        className="character"
      >
        <div className="characterNode_Section_Item">
              <input
                type="hidden"
                className="csrfToken"
                name="_csrf"
                value={props.csrf}
              />
              <input
                type="submit"
                className="exportToPDFButton"
                value="Export to PDF"
              />
            </div>
        <h3>Personal Information</h3>
        <div className="characterNode_Section">
          <div className="characterNode_Section_Item">
            <div id="characterName">Name: {character.name}</div>
          </div>
          <div className="characterNode_Section_Item">
            <div id="characterAge">Age: {character.age}</div>
          </div>
          <div className="characterNode_Section_Item">
            <div id="characterRace">Race: {character.race}</div>
          </div>
          <div className="characterNode_Section_Item">
            <div id="characterClassName">
              Class: {character.className}, {character.classLevel}
            </div>
          </div>
        </div>
        <h3>Ability Scores (Base + Racial)</h3>
        <div id="characterNode_Section">
          <div className="characterNode_Section_Item">
            <div id="base_strength">
              Str:{" "}
              {character.base_strength +
                props.dndData[character.race].str_bonus}{" "}
              ({character.base_strength} +
              {props.dndData[character.race].str_bonus})
            </div>
          </div>
          <div className="characterNode_Section_Item">
            <div id="base_dexterity">
              Dex:{" "}
              {character.base_dexterity +
                props.dndData[character.race].dex_bonus}{" "}
              ({character.base_dexterity} +
              {props.dndData[character.race].dex_bonus})
            </div>
          </div>
          <div className="characterNode_Section_Item">
            <div id="base_constitution">
              Con:{" "}
              {character.base_constitution +
                props.dndData[character.race].con_bonus}{" "}
              ({character.base_constitution} +
              {props.dndData[character.race].con_bonus})
            </div>
          </div>
          <div className="characterNode_Section_Item">
            <div id="base_wisdom">
              Wis:{" "}
              {character.base_wisdom + props.dndData[character.race].wis_bonus}{" "}
              ({character.base_wisdom} +
              {props.dndData[character.race].wis_bonus})
            </div>
          </div>
          <div className="characterNode_Section_Item">
            <div id="base_charisma">
              Cha:{" "}
              {character.base_charisma +
                props.dndData[character.race].cha_bonus}{" "}
              ({character.base_charisma} +
              {props.dndData[character.race].cha_bonus})
            </div>
          </div>
        </div>
        <h3>Racial Features</h3>
        <div className="characterNode_Section">
          <div className="characterNode_Section_Item">
            <div>{languages}</div>
            <div id="languages">
              {props.dndData[character.race].language_desc}
            </div>
          </div>
        </div>
        <span id="misc">
          <h3>Miscellaneous</h3>
          <div className="characterNode_Section">
            <div className="characterNode_Section_Item">
              <div id="idField">ID: {character._id}</div>
            </div>
          </div>
        </span>
      </form>
    );
  });

  return <div className="characterList">{characterNodes}</div>;
};

// format window for changing passwords
const PassChangeWindow = (props) => {
  return (
    <form
      id="passChangeForm"
      name="passChangeForm"
      onSubmit={handlePassChange}
      action="/passChange"
      method="POST"
      className="mainForm"
    >
      <label htmlFor="username">Username: </label>
      <input id="user" type="text" name="username" placeholder="Username" />
      <label htmlFor="pass">Old Password: </label>
      <input id="pass" type="password" name="pass" placeholder="Old Password" />
      <label htmlFor="newPass">New Password: </label>
      <input
        id="newPass"
        type="password"
        name="newPass"
        placeholder="New Password"
      />
      <label htmlFor="newPass2">Confirm New Password: </label>
      <input
        id="newPass2"
        type="password"
        name="newPass2"
        placeholder="Retype New Password"
      />
      <input type="hidden" name="_csrf" value={props.csrf} />
      <input className="formSubmit" type="submit" value="Confirm Change" />
    </form>
  );
};

// format window for visualizing account info
const AccountWindow = (props) => {
  const date = new Date(props.account.createdDate);
  return (
    <form
      id="accountForm"
      className="mainForm"
      onSubmit={handleAccountInfo}
      action="/changePremiumStatus"
      method="POST"
    >
      <div className="mainForm_Section">
        <label>Username: </label>
        <div className="mainForm_Value">{props.account.username}</div>
      </div>
      <div className="mainForm_Section">
        <label>Created Date: </label>
        <div className="mainForm_Value">
          {date.toDateString()}, {date.toLocaleTimeString()}
        </div>
      </div>
      <div className="mainForm_Section">
        <label>Premium: </label>
        <input
          className="mainForm_Value"
          id="isPremium"
          name="isPremium"
          type="checkbox"
        />
      </div>
      <div className="mainForm_Section">
        <input type="hidden" id="accountChanged" value="false" />
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input className="formSubmit" type="submit" value="Save" />
      </div>
    </form>
  );
};

// format account react component
const Footer = (props) => {
  let totalCharacterLevel = 0;
  props.characters.forEach(ch => totalCharacterLevel += ch.classLevel);
  const len = (props.characters.length !== 0) ? props.characters.length : 1;
  const avgCharacterLevel = totalCharacterLevel / len;

  return (
    <footer>
      <div className="footer_Section">
        <h3>Data</h3>
        <div className="footer_Section_Item">
          <div>Number of Characters: {props.characters.length}</div>
        </div>
        <div className="footer_Section_Item">
          <div>Average Level: {Math.round(avgCharacterLevel * 100) / 100}</div>
        </div>
      </div>
      <div className="footer_Section">
        <h3>Sources</h3>
        <div className="footer_Section_Item">
          <a href="https://company.wizards.com/" target="_blank">
            Wizards of the Coast ©
          </a>
        </div>
        <div className="footer_Section_Item">
          <a href="https://www.dnd5eapi.co/" target="_blank">
            D&D 5e API
          </a>
          <a href="https://github.com/MrRio/jsPDF" target="_blank">JS PDF Converter</a>
        </div>
      </div>
    </footer>
  );
};

// set any dynamic form values and render account component
const createAccountWindow = (csrf) => {
  sendAjax("GET", "/getAccountInfo", null, (acc) => {
    ReactDOM.render(
      <AccountWindow account={acc} csrf={csrf} />,
      document.querySelector("#content")
    );
    const premiumCheckbox = document.querySelector("#isPremium");
    premiumCheckbox.checked = acc.isPremium;
    premiumCheckbox.addEventListener("change", () => {
      document.querySelector("#accountChanged").value = "true";
    });
  });
};

// render password change window
const createPassChangeWindow = (csrf) => {
  ReactDOM.render(
    <PassChangeWindow csrf={csrf} />,
    document.querySelector("#content")
  );
};

// render footer component
const createFooter = (characters) => {
  ReactDOM.render(
    <Footer characters={characters} />,
    document.querySelector("#pageFooter")
  );
};

// get any other server data and assign it to then render with the character model data
const loadCharactersFromServer = (csrf) => {
  sendAjax("GET", "/getCharacters", null, (data) => {
    let results = [];
    let classes = [];
    let races = [];

    // race and class data that needs to be fetched
    for (let i = 0; i < data.characters.length; i++) {
      if (!classes.includes(data.characters[i].className))
        classes.push(data.characters[i].className);
      if (!races.includes(data.characters[i].race))
        races.push(data.characters[i].race);
    }

    // collect promises from api calls
    let promises = [];
    classes.forEach((c) => {
      promises.push(
        sendAjax(
          "GET",
          `https://www.dnd5eapi.co/api/classes/${c.toLowerCase()}`,
          null,
          (res) => {
            results[res.name] = res;
          }
        )
      );
    });
    races.forEach((r) => {
      promises.push(
        sendAjax(
          "GET",
          `https://www.dnd5eapi.co/api/races/${r.toLowerCase()}`,
          null,
          (res) => {
            results[res.name] = res;
            results[res.name]["str_bonus"] = getDND_Race_AB(
              results[res.name],
              "str"
            );
            results[res.name]["dex_bonus"] = getDND_Race_AB(
              results[res.name],
              "dex"
            );
            results[res.name]["con_bonus"] = getDND_Race_AB(
              results[res.name],
              "con"
            );
            results[res.name]["wis_bonus"] = getDND_Race_AB(
              results[res.name],
              "wis"
            );
            results[res.name]["cha_bonus"] = getDND_Race_AB(
              results[res.name],
              "cha"
            );
          }
        )
      );
    });

    // load character list after all promises are fulfilled
    $.when.apply(null, promises).then(() => {
      ReactDOM.render(
        <CharacterList
          csrf={csrf}
          dndData={results}
          characters={data.characters}
        />,
        document.querySelector("#characters")
      );

      createFooter(data.characters);

      sendAjax("GET", "/getPremiumStatus", null, (status) => {
        document.querySelectorAll(".exportToPDFButton").forEach((btn) => {
          btn.value += "(Premium Only)";
          btn.disabled = !status.isPremium;
        });
      });
    });
  });
};

// set any relevant event handlers and render the main content
const setup = function (csrf) {
  const passChangeButton = document.querySelector("#passChangeButton");
  const accountInfoButton = document.querySelector("#accountInfoButton");
  const allExportToPDFButtons = document.querySelectorAll(".exportToPDFButton");

  allExportToPDFButtons.forEach((btn) => {
    btn.addEventListener("click", exportToPDF);
  });
  passChangeButton.addEventListener("click", (e) => {
    e.preventDefault();
    createPassChangeWindow(csrf);
    return false;
  });
  accountInfoButton.addEventListener("click", (e) => {
    e.preventDefault();
    createAccountWindow(csrf);
    return false;
  });

  ReactDOM.render(
    <CharacterForm csrf={csrf} />,
    document.querySelector("#makeCharacter")
  );

  const rollScoresBtn = document.querySelector("#rollScoresBtn");
  rollScoresBtn.addEventListener("click", rollAbilities);

  loadCharactersFromServer(csrf);
};

const getToken = () => {
  sendAjax("GET", "/getToken", null, (result) => {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
