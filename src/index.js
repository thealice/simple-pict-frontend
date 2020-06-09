const baseURL = "http://localhost:3000/api/v1/";
let game = {}

document.addEventListener('DOMContentLoaded', () => {
    // const drawboard = document.getElementById("drawboard")
    const communications = document.getElementById("communications")
    getThemes();

});

function renderThemeOptions(arrayOfThemeObjs, id) {
    let selectOptions = document.getElementById(id)
    arrayOfThemeObjs.forEach(themeObj => {
        let themeOption = document.createElement("option");
        themeOption.innerHTML += themeObj.name;
        themeOption.value = themeObj.id;
        // if(game.currentGame && game.currentGame.theme.name === themeObj.name) { themeOption.setAttribute("selected", "selected") }
        selectOptions.appendChild(themeOption);
    })
}

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
        promptForm();
    })

}

function promptForm() {
    const div = document.createElement("div")
    div.setAttribute("id", "game-setup-container")

    const p = document.createElement("p")
    p.innerHTML = `
        <h1>Hi, Welcome to Simple Pictionary!</h1>
        You can add new cards to the deck below. Otherwise, <button id="begin-setup">Let's begin</button>
    `
    div.appendChild(p);

    let button = p.querySelector("button")

    const promptForm = document.createElement("form")
    promptForm.setAttribute("id", "prompt-setup")
    promptForm.innerHTML = `
 
                <div class="mb-10">
                    <label for="prompt-content">Enter your prompt (the word(s) that will be drawn):</label><br />
                    <input type="text" name="content" id="prompt-content">
                </div>

                <div class="mb-10">
                    <label for="theme_id">File it under:</label><br />
                    <select name="theme_id" id="theme_id">
                    </select>
                </div>

                <input id= 'create-prompt-button' type="submit" name="submit" value="Create Prompt" class="submit">     
        `

    div.appendChild(promptForm);
    communications.appendChild(div)
    game.promptForm = promptForm;

    renderThemeOptions(Theme.all, "theme_id")

    promptForm.addEventListener("submit", (e) => 
        createPromptFormHandler(e)
    )

    button.addEventListener("click", () => {
        game.promptForm.style.display = "none";
        loadSetup();
    })

}

function createPromptFormHandler(e) {
    e.preventDefault()
    const promptContentInput = document.getElementById("prompt-content").value
    const promptThemeId =  parseInt(document.getElementById("theme_id").value)
    // send prompt to backend to create a new Prompt and store it in the DB
    postFetch(promptContentInput, promptThemeId)
    // Add the new prompt to the OO JS version of Themes
    //  TODO: create a find method for Theme class
    const promptTheme = Theme.all.find(themeObj => themeObj.id === promptThemeId);
    promptTheme.prompts.push(promptContentInput)
    
    game.promptForm.reset();
}

function postFetch(content, theme_id) {
    const bodyData = {content, theme_id}
    fetch(`${baseURL}prompts`, {
        method: 'POST', 
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(prompt => {
        console.log('Success:', prompt);
    })
}

function loadSetup() {
    let div = document.getElementById("game-setup-container")
    let p = div.querySelector("p")
    p.innerText = `Let's get this game going`

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
    const themeId = parseInt(document.getElementById("theme_name").value)

    game.currentGame = new Game(team1Input, team2Input, themeId)
    // promptForm();
}

function getThemePrompts() {
    fetch(`${baseURL}themes`)
    .then(res => res.json())
    .then(themes => {
        themes.data.forEach(theme => {
            theme.attributes.prompts.forEach(prompt => {
                let promptObj = new Prompt(prompt.content)
                // Right now I'm only storing the prompt content
                // if there were more attributes I'd want to do this differently
                themeObj.prompts.push(promptObj.content)
            })
        })
        // loadSetup(); 
    })
}









