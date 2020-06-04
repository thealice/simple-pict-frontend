const baseURL = "http://localhost:3000/api/v1/";

document.addEventListener('DOMContentLoaded', () => {
    // renderCanvas();
    // let themes = 
    getThemes();
    // where do I get theme names and their prompts and store them?

    // let themeNames = loadThemeNames(themes);
    loadModal(); 
    // see notes.md to figure out flow here
    // one idea: Load instructions and setup form with: 
        // enter team names
        // select a theme or no theme
        // submit button
    // fetch prompts from that theme
    // or get all prompts if user selects "none"
        // getAllPrompts();
    // ask if player wants to add a prompt or start game
        // if yes load "create a prompt" form
        // upon submit create a new prompt and post to database
    
    // show team name whose turn it is and begin gameplay button
    // begin gameplay
});


function getThemes() {
    const themesArr = [];
    fetch(`${baseURL}themes`)
    .then(res => res.json())
    .then(themes => {
        // TODO: change to map rather than forEach?
        themes.data.forEach(theme => {
            let themeObj = new Theme(theme.attributes.name, theme.attributes.prompts)
            themesArr.push(themeObj)
        })
    })
    return(themesArr);
}

// function loadThemeNames(themeObjects) {
//     return themeObjects.map(theme => {
//         return this.push(theme.name)
//     })
    
// }

function loadModal() {
    const modal = document.getElementById("instructionsModal")
    const p = document.createElement("p")
    p.innerText = `Hi, Welcome to Simple Pictionary!`

    const setupForm = document.createElement("form")
    setupForm.setAttribute("id", "game-setup")
    setupForm.innerHTML = `
            <fieldset>
                <legend>Setup your teams:</legend>
                <div>
                <label for="team1_name">
                Team1 Name:
                </label><br>
                    <input type="text" name="team1_name" id="team1_name" placeholder="Enter first Team name...">
                </div>
            <div>
                <label for="team2_name">Team 2 Name:</label><br>
                <input type="text" name="team2_name" id="team2_name" placeholder="Enter second Team name...">
            </div>
            </fieldset>
            <fieldset>
                <legend>Select Your Theme:</legend>
                <div>
                    <label for="team2_name">Team 2 Name:</label><br>
                    <select name="theme_name" id="theme_name">
                        <option
                    </select>
                </div>
            </fieldset>
            
        `
    modal.appendChild(p);
    modal.appendChild(setupForm);


}

function getAllPrompts() {
    const promptsArr = [];
    fetch(`${baseURL}prompts`)
    .then(res => res.json())
    .then(prompts => {
        prompts.data.forEach(prompt => {
            promptsArr.push(prompt.attributes.content)
        })
    })
    return promptsArr;
}

// JS Classes

class Theme {
    constructor(name, themePrompts) {
        this.name = name;
        this.prompts = themePrompts
    }
}

class Team {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }
}