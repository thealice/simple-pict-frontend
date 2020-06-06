class Theme {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.prompts = []
        Theme.all.push(this);
    }

    static all = [];
}