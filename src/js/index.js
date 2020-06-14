const baseURL = "http://localhost:3000/api/v1/";
let game = {}

document.addEventListener('DOMContentLoaded', () => {
    const drawboard = document.getElementById("drawboard")
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
        themes.data.forEach(theme => {
            let themeObj = new Theme(theme.attributes.name, theme.attributes.id)
            theme.attributes.prompts.forEach(prompt => {
                let promptObj = new Prompt(prompt.id, prompt.content, themeObj)
                themeObj.prompts.push(promptObj)
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

                <input id='create-prompt-button' type="submit" name="submit" value="Create Prompt" class="submit">     
        `
    div.appendChild(promptForm);
    communications.appendChild(div)
    game.promptForm = promptForm;

    renderThemeOptions(Theme.all, "theme_id")

    promptForm.addEventListener("submit", (e) => 
        createPromptFormHandler(e)
    )

    const button = document.getElementById("begin-setup")

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
        console.log(prompt);
        // Add the new prompt to the OO JS version of Themes
        const promptTheme = Theme.all.find(themeObj => themeObj.id === theme_id);
        promptTheme.prompts.push(new Prompt(prompt.id, prompt.content, promptTheme))
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
                    <option value="0">All themes</option>
                    </select>
                </div>
            </fieldset>
            <input id= 'setup-button' type="submit" name="submit" value="Start Game" class="submit">       
        `
    div.appendChild(p);
    div.appendChild(setupForm);
    game.setupContainer = div;
    renderThemeOptions(Theme.all, "theme_name")

    setupForm.addEventListener("submit", (e) => 
        gameSetupHandler(e)
    )

}

function gameSetupHandler(e) {
    game.setupContainer.style.display = "none";
    e.preventDefault()
    getPrompts();
    const team1Input = document.getElementById("team1").value
    const team2Input = document.getElementById("team2").value
    const themeId = parseInt(document.getElementById("theme_name").value)
    let theme;
    if(!themeId) {
        theme = new Theme("All Themes", 0)
        theme.prompts = Prompt.all
    } else {
        theme = Theme.all.find(themeObj => themeObj.id === themeId)
    }
    game.currentGame = new Game(team1Input, team2Input, theme)
    loadInstructions();
}

function loadInstructions() {
    let team1 = game.currentGame.team1
    let team2 = game.currentGame.team2
    let scorecard = `${team1.name}: ${team1.score}<br />${team2.name}: ${team2.score}`;
    let gameInfo;
    if(document.getElementById("game-info-container")) {
        gameInfo = document.getElementById("game-info-container")
        game.turnInfo.style.display = "block";
        game.roundInfo.style.display = "block";
    } else {
        gameInfo = document.createElement("div")
        gameInfo.setAttribute("id", "game-info-container")
    }
    
    if(team1.score > 2) {
        
        gameInfo.innerHTML = `
            Congratulations, ${team1.name}, you won!!!<br>
            ${scorecard}<br>
        `
        communications.appendChild(gameInfo)
        
    } else if(team2.score > 2) {
        gameInfo.innerHTML = `
            Congratulations, ${team2.name}, you won!!!<br>
            ${scorecard}<br>
        `
        communications.appendChild(gameInfo)
        
    } else {
        gameInfo.innerHTML = `
        <h1 id="turn-info" class="mb-3">It's ${game.currentGame.turn.name}'s Turn!</h1>
        
        <div id="round-info" class="row mb-3">
            <div class="col-md-auto">
                <h2>Scorecard</h2>
                ${scorecard}
            </div>
            <div class="col-md-auto">
                <h2>Theme</h2>
                ${game.currentGame.theme.name}
            </div>
        </div>

        <div id="instructions" class="row mb-3">
            <div class="col-md-auto">
                <h2>Instructions</h2>
                Decide whose turn it is to draw. Everyone else should avert their eyes!<br />
                <span>When the drawer is ready, click <button id="prompt-reveal">Show prompt</button> to begin gameplay</span><br />
                The prompt will display for 5 seconds and then ${game.currentGame.turn.name} will have 60 seconds to guess the drawing.
            </div>
        </div>
    `
        communications.appendChild(gameInfo)
        const promptButton = document.getElementById("prompt-reveal");
        
        promptButton.addEventListener("click", () => {
            revealPrompt();
            setTimeout(loadDrawboard, 1000);
        })
    }


    game.info = gameInfo
    game.turnInfo = document.getElementById("turn-info");
    game.roundInfo = document.getElementById("round-info");

}

function revealPrompt () {
    
    let currentPrompts = game.currentGame.prompts
    let randomPrompt = currentPrompts[Math.floor(Math.random() * currentPrompts.length)]
    const promptReveal = game.info.querySelector("span")
    // display this round's prompt
    promptReveal.innerHTML = randomPrompt.content
    // remove this prompt from the current game
    game.currentGame.prompts = currentPrompts.filter((prompt) => prompt !== randomPrompt);
}

function scoreForm() {
    
    clearCanvas();
    drawboard.style.display = "none";
    game.turnInfo.style.display = "none";
    game.roundInfo.style.display = "none";
    if(game.scoreForm) {
        game.scoreForm.remove();
    }
    const scoreForm = document.createElement("form");
    scoreForm.setAttribute("id", "score-form")
    scoreForm.innerHTML = `
        <label for="addScore">Did you score a point this round?</label>
        <select id="add-score">
            <option value="yes">Yes</option>
            <option value="no">No</option>
        </select>

        <input type="submit" id="submit-score" name="submit" value="Submit Score" class="submit">
    `
    communications.appendChild(scoreForm)
    game.scoreForm = scoreForm; 

    scoreForm.addEventListener("submit", (e) => 
        scoreFormHandler(e)
    )
}

function scoreFormHandler(e) {
    
    e.preventDefault()
    const scoreInput = document.getElementById("add-score").value
    game.scoreForm.style.display = "none";

    if (scoreInput === "yes") {
        // add to team whose turn it is' score
        game.currentGame.turn.score++;
        console.log(`after: ${game.currentGame.turn.score}`)
        game.scoreForm.reset();
        console.log(scoreInput)
        // current team gets to go again
        loadInstructions();
    }  else {
        // update game turn to other team
        let [team1, team2] = game.currentGame.teams
        game.currentGame.turn = game.currentGame.turn === team1 ? team2 : team1
        game.scoreForm.reset();
        loadInstructions();
    }
}









