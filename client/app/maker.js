const handleDomo = (e) => {
    e.preventDefault();

    $("domoMessage").animate({width:'hide'}, 350);
    
    if($("domoName").val() == '' || $("#domoAge").val() == ''){
        handleError("RAWR! All fields are required.");
        return false;
    }

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function(){
        loadDomosFromServer();
    });

    return false;
};

const DomoForm = (props) => {
    return (
        <form id="domoForm"
        onSubmit={handleDomo}
        name="domoForm"
        action="/maker"
        method="POST"
        className="domoForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name" />
            <label htmlFor="age">Age: </label>
            <input id="domoAge" type="text" name="age" placeholder="Domo Age" />
            <label htmlFor="race">Race: </label>
            <select id="raceField" name="race">
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
            <div id="classesField" name="classes">
            <label htmlFor="className">Class: </label>
            <select id="classNameField" name="className">
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
            </div>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
        </form>
    );
};

const DomoList = function(props){
    if(props.domos.length === 0){
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos yet</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(function(domo){
        return (
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoName">Name: {domo.name}</h3>
                <h3 className="domoAge">Age: {domo.age}</h3>
                <h3 className="raceField">Race: {domo.race}</h3>
                <h3 className="classNameField">Class: {domo.className}, {domo.classLevel}</h3>
                <h3 className="idField">ID: {domo._id}</h3>
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const loadDomosFromServer = () => {
    sendAjax('GET', '/getDomos', null, (data) => {
        ReactDOM.render(
            <DomoList domos={data.domos} />, document.querySelector("#domos")  
        );
    });
};

const setup = function(csrf){
    ReactDOM.render(
        <DomoForm csrf={csrf} />, document.querySelector("#makeDomo")  
    );

    ReactDOM.render(
        <DomoList domos={[]} />, document.querySelector("#domos")
    );

    loadDomosFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
});