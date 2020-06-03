const baseURL = "http://localhost:3000/api/v1/";

document.addEventListener('DOMContentLoaded', () => {
    getThemes();

    // load theme names into form for users to select a theme or no theme

    // ask what theme and team names
    // then fetch prompts from that theme
    // or get all prompts if user selects "none"
        // getAllPrompts();
    // should i getThemes() and getPrompts() separately and store them
    // load instructions and team names form
    // show team name whose turn it is and begin gameplay button
    // begin gameplay
});

function getThemes() {
    const themesArr = [];
    fetch(`${baseURL}themes`)
    .then(res => res.json())
    .then(themes => {
        themes.data.forEach(theme => {
            let themeObj = new Theme(theme.attributes.name, theme.attributes.prompts)
            themesArr.push(themeObj)
        })
    })
    return(themesArr);
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