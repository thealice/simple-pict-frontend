const baseURL = "http://localhost:3000/api/v1/";
let game = {}

document.addEventListener('DOMContentLoaded', () => {
    // const drawboard = document.getElementById("drawboard")
    const communications = document.getElementById("communications")
    getThemes();

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

function renderThemeOptions(arrayOfThemeObjs, id) {
    let selectOptions = document.getElementById(id);
    arrayOfThemeObjs.forEach(themeObj => {
        let themeOption = document.createElement("option");
        themeOption.innerHTML += themeObj.name;
        themeOption.value = themeObj.id;
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
    game.setupForm = setupForm;
    renderThemeOptions(Theme.all, "theme_name")

    setupForm.addEventListener("submit", (e) => 
        gameSetupHandler(e)
    )

}

function gameSetupHandler(e) {
    game.setupForm.style.display = "none";
    e.preventDefault()
    const team1Input = document.getElementById("team1").value
    const team2Input = document.getElementById("team2").value
    const themeInput = document.getElementById("theme_name").value

    game.currentgame = new Game(team1Input, team2Input, themeInput)
    promptForm();
}

function promptForm() {
    let div = document.getElementById("game-setup-container")

    let button = document.createElement("button");
    button.innerText = "Begin Game"
    div.prepend(button);

    let p = div.querySelector("p")
    p.innerText = "Would you like to submit a prompt?"

    const promptForm = document.createElement("form")
    promptForm.setAttribute("id", "prompt-setup")
    promptForm.innerHTML = `
                <div>
                    <select name="theme_id" id="theme_id">
                    </select>
                </div>
                <div>
                    <input type="text" name="content">
                </div>
            <input id= 'create-prompt-button' type="submit" name="submit" value="Create Prompt" class="submit">     
        `

    div.appendChild(p);
    div.appendChild(promptForm);
    game.promptForm = promptForm;
    renderThemeOptions(Theme.all, "theme_id")
    promptForm.addEventListener("submit", (e) => 
        console.log(e)
    )

}







