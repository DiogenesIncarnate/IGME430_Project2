const handleCharacter = (e) => {
  e.preventDefault();

  $("characterMessage").animate({ width: "hide" }, 350);

  if ($("characterName").val() == "" || $("#characterAge").val() == "") {
    handleError("All fields are required.");
    return false;
  }

  sendAjax(
    "POST",
    e.target.getAttribute("action"),
    $("#characterForm").serialize(),
    function () {
      loadCharactersFromServer();
    }
  );

  return false;
};

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
    handleError("RAWR! Passwords do not match.");
    return false;
  }

  sendAjax(
    "POST",
    $("#passChangeForm").attr("action"),
    $("#passChangeForm").serialize(),
    redirect
  );
};

const saveCharacter = (e) => {
  e.preventDefault();
  const characterID = "#" + e.target.id;

  sendAjax(
    "POST",
    $(characterID).attr("action"),
    $(characterID).serialize(),
    null
  );
};

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
          <input name="base_strength" type="number" min="1" max="20" />
        </div>
        <div className="characterForm_Section_Item">
          <label htmlFor="base_dexterity">Dexterity: </label>
          <input name="base_dexterity" type="number" min="1" max="20" />
        </div>
        <div className="characterForm_Section_Item">
          <label htmlFor="base_constitution">Constitution: </label>
          <input name="base_constitution" type="number" min="1" max="20" />
        </div>
        <div className="characterForm_Section_Item">
          <label htmlFor="base_wisdom">Wisdom: </label>
          <input name="base_wisdom" type="number" min="1" max="20" />
        </div>
        <div className="characterForm_Section_Item">
          <label htmlFor="base_charisma">Charisma: </label>
          <input name="base_charisma" type="number" min="1" max="20" />
        </div>
      </div>
      <div className="characterForm_Section">
        <input type="hidden" name="_csrf" value={props.csrf} />
        <div className="characterForm_Section_Item">
          <input
            className="makeCharacterSubmit"
            type="submit"
            action="/maker"
            value="Make Character"
          />
        </div>
        <div className="characterForm_Section_Item">
          <input
            className="makeCharacterSubmit"
            type="submit"
            formaction="/saveCharacter"
            value="Export to PDF"
          />
        </div>
      </div>
    </form>
  );
};

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
    return (
      <form
        id={character._id}
        onSubmit={saveCharacter}
        name="character"
        action="/saveCharacter"
        method="POST"
        className="character"
      >
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
        <h3>Miscellaneous</h3>
        <div className="characterNode_Section">
          <div className="characterNode_Section_Item">
            <div id="idField">ID: {character._id}</div>
          </div>
        </div>
      </form>
    );
  });

  return <div className="characterList">{characterNodes}</div>;
};

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

const createPassChangeWindow = (csrf) => {
  ReactDOM.render(
    <PassChangeWindow csrf={csrf} />,
    document.querySelector("#content")
  );
};

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
    });
  });
};

const setup = function (csrf) {
  const passChangeButton = document.querySelector("#passChangeButton");

  passChangeButton.addEventListener("click", (e) => {
    e.preventDefault();
    createPassChangeWindow(csrf);
    return false;
  });

  ReactDOM.render(
    <CharacterForm csrf={csrf} />,
    document.querySelector("#makeCharacter")
  );

  const characterClass = document.querySelector("#characterFormClassName");

  characterClass.addEventListener("change", (e) => {
    e.preventDefault();
    document.body.style.backgroundImage = "url('img/barbarian.jpg')";
  });

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
