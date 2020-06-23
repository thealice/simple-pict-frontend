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