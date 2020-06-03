const baseURL = "http://localhost:3000/api/v1/";
const promptsArr = [];
const themesArr = [];


document.addEventListener('DOMContentLoaded', () => {
    console.log(getThemes());
    console.log(getAllPrompts());
    // ask what theme and team names
    // then fetch prompts from that theme
    // should i getThemes() and getPrompts() separately and store them
    // load instructions and team names form
    // show team name whose turn it is and begin gameplay button
    // begin gameplay
});

function getThemes() {

    fetch(`${baseURL}themes`)
    .then(res => res.json())
    .then(themes => {
        themes.data.forEach(theme => {
            themesArr.push(theme.attributes.name)
        })
    })
    return themesArr;
}


function getAllPrompts() {
    fetch(`${baseURL}prompts`)
    .then(res => res.json())
    .then(prompts => {
        prompts.data.forEach(prompt => {
            promptsArr.push(prompt.attributes.content)
        })
    })
    return promptsArr;
}

// function getPrompts() {
//     fetch(endPoint)
//     .then(res => res.json())
//     .then(prompts => {
//         prompts.data.map(prompt => {
//             promptsArr.push(prompt.attributes.content)
//             // should i make separate arrays for each theme here?
//         })
//         console.log(promptsArr);
//     })
// }

// JS Classes