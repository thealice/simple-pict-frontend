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
                // Right now I'm only storing the prompt content
                // if there were more attributes I'd want to do this differently
                themeObj.prompts.push(promptObj.content)
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
                    <input type="text" name="team1" id="team1" placeholder="Enter first Team name...">
                </div>
            <div>
                <label for="team2_name">Team 2 Name:</label><br>
                <input type="text" name="team2" id="team2" placeholder="Enter second Team name...">
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

    const gameSetupForm = document.getElementById("game-setup")
    gameSetupForm.addEventListener("submit", (e) => 
        gameSetupHandler(e)
    )

}

function gameSetupHandler(e) {
    e.preventDefault()
    const team1Input = document.getElementById("team1").value
    const team2Input = document.getElementById("team2").value
    const themeInput = document.getElementById("theme_name").value

    let currentGame = new Game(team1Input, team2Input, themeInput)
    console.log(currentGame)

}







