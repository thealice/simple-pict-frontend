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
            let themeObj = Theme.all.find(theme => theme.id === prompt.attributes.theme.id);
            new Prompt(prompt.attributes.id, prompt.attributes.content, themeObj)
        })
    })
}