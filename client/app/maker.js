const handleCharacter = (e) => {
    e.preventDefault();

    $("domoMessage").animate({width:'hide'}, 350);
    
    if($("characterName").val() == '' || $("#characterAge").val() == ''){
        handleError("RAWR! All fields are required.");
        return false;
    }

    sendAjax('POST', $("#characterForm").attr("action"), $("#characterForm").serialize(), function(){
        loadCharactersFromServer();
    });

    return false;
};

const CharacterForm = (props) => {
    return (
        <form id="characterForm"
        onSubmit={handleCharacter}
        name="characterForm"
        action="/maker"
        method="POST"
        className="characterForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="characterName" type="text" name="name" placeholder="Character Name" />
            <label htmlFor="age">Age: </label>
            <input id="characterAge" type="text" name="age" placeholder="Character Age" />
            <label htmlFor="race">Race: </label>
            <select id="characterRace" name="race">
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
            <label htmlFor="className">Class: </label>
            <select id="characterClassName" name="className">
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
            <label htmlFor="classLevel">Class Level: </label>
            <input id="classLevelField" name="classLevel" type="number" min="1" max="20"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeCharacterSubmit" type="submit" value="Make Character" />
        </form>
    );
};

const CharacterList = function(props){
    if(props.characters.length === 0){
        return (
            <div className="characterList">
                <h3 className="emptyCharacter">No Characters yet</h3>
            </div>
        );
    }

    const characterNodes = props.characters.map(function(character){
        return (
            <div key={character._id} className="character">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="characterName">Name: {character.name}</h3>
                <h3 className="characterAge">Age: {character.age}</h3>
                <h3 className="characterRace">Race: {character.race}</h3>
                <h3 className="characterClassName">Class: {character.className}, {character.classLevel}</h3>
                <h3 className="idField">ID: {character._id}</h3>
            </div>
        );
    });

    return (
        <div className="characterList">
            {characterNodes}
        </div>
    );
};

const loadCharactersFromServer = () => {
    sendAjax('GET', '/getCharacters', null, (data) => {
        ReactDOM.render(
            <CharacterList characters={data.characters} />, document.querySelector("#characters")  
        );
    });
};

const setup = function(csrf){
    ReactDOM.render(
        <CharacterForm csrf={csrf} />, document.querySelector("#makeCharacter")  
    );

    ReactDOM.render(
        <CharacterList characters={[]} />, document.querySelector("#characters")
    );

    loadCharactersFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});