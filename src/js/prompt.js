class Prompt {
    constructor(id, content, theme) {
        this.content = content
        this.id = id;
        this.theme = theme.name
        Prompt.all.push(this);
        Prompt.allContent.push(this.content)
    }

    static all = [];

    static allContent = [];
}

const getPrompts = () => {
    fetch(`${baseURL}prompts`)
    .then(res => res.json())
    .then(prompts => {
        prompts.data.forEach(prompt => {
            let themeObj = Theme.all.find(themeObj => themeObj.id === prompt.attributes.theme_id);
            new Prompt(prompt.attributes.id, prompt.attributes.content, themeObj)
        })
    })
}

// function getThemes() {

//     fetch(`${baseURL}themes`)
//     .then(res => res.json())
//     .then(themes => {
//         // TODO: change to map rather than forEach?
//         themes.data.forEach(theme => {
//             let themeObj = new Theme(theme.attributes.name, theme.attributes.id)
//             theme.attributes.prompts.forEach(prompt => {
//                 let promptObj = new Prompt(prompt.content)
//                 // Right now I'm only storing the prompt content
//                 // if there were more attributes I'd want to do this differently
//                 themeObj.prompts.push(promptObj.content)
//             })
//         })
//         promptForm();
//     })

// }