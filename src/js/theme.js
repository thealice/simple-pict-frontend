class Theme {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.prompts = []
        Theme.all.push(this);
    }

    static all = [];
}

const getThemes = () => {

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