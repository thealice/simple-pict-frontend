const baseURL = "http://localhost:3000/api/v1/";

document.addEventListener('DOMContentLoaded', () => {
    const drawboard = document.getElementById("drawboard")
    const communications = document.getElementById("communications")
    // renderCanvas();
    getThemes();


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

    fetch(`${baseURL}themes`)
    .then(res => res.json())
    .then(themes => {
        // TODO: change to map rather than forEach?
        themes.data.forEach(theme => {
            let themeObj = new Theme(theme.attributes.name, theme.attributes.id)
            theme.attributes.prompts.forEach(prompt => {
                let promptObj = new Prompt(prompt.content)
                themeObj.prompts.push(promptObj)
            })
        })
        loadSetup(); 
    })

}

function renderThemeOptions(arrayOfThemeObjs) {
    let selectOptions = document.getElementById("theme_name");
    arrayOfThemeObjs.forEach(themeObj => {
        let themeOption = document.createElement("option");
        themeOption.innerHTML += themeObj.name;
        themeOption.setAttribute("value", themeObj.id);
        selectOptions.appendChild(themeOption);
    })
}

function loadSetup() {

    const div = document.createElement("div")
    div.setAttribute("id", "game-setup-container")

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
                <legend>Select your theme:</legend>
                <div>
                    <select name="theme_name" id="theme_name">
                    <option value="all">All themes</option>
                    </select>
                </div>
            </fieldset>
            <input id= 'setup-button' type="submit" name="submit" value="Setup Game" class="submit">
            
        `
    communications.appendChild(div)
    div.appendChild(p);
    div.appendChild(setupForm);
    renderThemeOptions(Theme.all)

}

// const getAllPrompts = () => {
//     const promptsArr = [];
//     fetch(`${baseURL}prompts`)
//     .then(res => res.json())
//     .then(prompts => {
//         prompts.data.forEach(prompt => {
//             promptsArr.push(prompt.attributes.content)
//         })
//     })
//     return promptsArr;
// }

// JS Classes

class Theme {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.prompts = []
        Theme.all.push(this);
    }

    static all = [];
}

class Team {
    constructor(name) {
        this.name = name;
        this.score = 0;
        Team.all.push(this);
    }

    static all = [];
}

class Prompt {
    constructor(content) {
        this.content = content
    }
}

class Game {
    constructor(team1, team2, theme="all") {
        this.team1 = team1;
        this.team2 = team2;
        this.theme = theme;
        this.scoreCard = `${team1.name}: ${team1.score}, ${team2.name}: ${team2.score}`
    }
}