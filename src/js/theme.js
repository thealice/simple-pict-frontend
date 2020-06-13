class Theme {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        // Right now this only stores the prompt content
        this.prompts = []
        Theme.all.push(this);
    }

    static all = [];
}