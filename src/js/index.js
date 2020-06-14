const baseURL = "http://localhost:3000/api/v1/";
let game = {}

document.addEventListener('DOMContentLoaded', () => {
    const communications = document.getElementById("communications")
    getThemes();
});

function renderThemeOptions(arrayOfThemeObjs, where_id) {
    let selectOptions = document.getElementById(where_id)
    arrayOfThemeObjs.forEach(themeObj => {
        let themeOption = document.createElement("option");
        themeOption.innerHTML += themeObj.name;
        themeOption.value = themeObj.id;
        selectOptions.appendChild(themeOption);
    })
}

function loadSetup() {
    const div = document.getElementById("game-setup-container")
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
        game.headerInfo.style.display = "block";
        game.roundInfo.style.display = "block";
        if(game.turnInfo) { game.turnInfo.remove()}
    } else {
        gameInfo = document.createElement("div")
        gameInfo.setAttribute("id", "game-info-container")
    }
    
    if(team1.score > 11) {
        
        gameInfo.innerHTML = `
            Congratulations, ${team1.name}, you won!!!<br>
            ${scorecard}<br>
        `
        communications.appendChild(gameInfo)
        
    } else if(team2.score > 11) {
        gameInfo.innerHTML = `
            Congratulations, ${team2.name}, you won!!!<br>
            ${scorecard}<br>
        `
        communications.appendChild(gameInfo)
        
    } else {
        gameInfo.innerHTML = `
        <h1 id="header-info" class="mb-3">It's ${game.currentGame.turn.name}'s Turn!</h1>
        
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
            setTimeout(loadDrawboard, 5000);
        })
    }


    game.info = gameInfo
    game.headerInfo = document.getElementById("header-info");
    game.roundInfo = document.getElementById("round-info");

}

function scoreForm() {
    // clear the drawboard and remove it and the round details from view
    clearCanvas();
    canvas.style.display = "none";
    game.headerInfo.style.display = "none";
    game.roundInfo.style.display = "none";
    // if a scoreForm has been shown before, get rid of it entirely
    if(game.scoreForm) {
        game.scoreForm.remove();
    }
    // create a scoreForm and add it to DOM
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
    // prevent form submit from reloading the page
    e.preventDefault()
    // store the form response in a variable
    const scoreInput = document.getElementById("add-score").value
    // hide theform
    game.scoreForm.style.display = "none";

    if (scoreInput === "yes") {
        // add to team-whose-turn-it-is' score
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









