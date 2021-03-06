const getPrompts = () => {
    fetch(`${baseURL}prompts`)
    .then(res => res.json())
    .then(prompts => {
        prompts.data.forEach(prompt => {
            let themeObj = Theme.all.find(theme => theme.id === prompt.attributes.theme.id);
            new Prompt(prompt.attributes.id, prompt.attributes.content, themeObj)
        })
    })
}

function promptForm() {
    const div = document.createElement("div")
    div.setAttribute("id", "game-setup-container")

    const p = document.createElement("p")
    p.innerHTML = `
        <h1>Welcome to Simple Pictionary!</h1>
        <hr>
        You can add new cards to the deck below. Otherwise, <button id="begin-setup" class="btn-pink">Let's begin</button>
    `
    div.appendChild(p);

    const promptForm = document.createElement("form")
    promptForm.setAttribute("id", "prompt-setup")
    promptForm.innerHTML = `
 
                <div class="mb-10">
                    <label for="prompt-content">Enter your prompt: </label>
                    <input type="text" name="content" id="prompt-content">
                </div>

                <div class="mb-10">
                    <label for="theme_id">File it under: </label>
                    <select name="theme_id" id="theme_id">
                    </select>
                </div>

                <input id='create-prompt-button' type="submit" name="submit" value="Create Prompt" class="submit">     
        `
    div.appendChild(promptForm);
    document.getElementById("communications").appendChild(div)
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

function revealPrompt () {
    
    let currentPrompts = game.currentGame.prompts
    // select random prompt
    let randomPrompt = currentPrompts[Math.floor(Math.random() * currentPrompts.length)]
    // display this round's prompt
    document.getElementById("prompt").innerHTML = randomPrompt.content
    // remove this prompt from the current game
    game.currentGame.prompts = currentPrompts.filter((prompt) => prompt !== randomPrompt);
}