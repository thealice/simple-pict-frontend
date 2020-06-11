class Team {
    constructor(name) {
        this.name = name;
        this.score = 0;
        Team.all.push(this);
    }

    static all = [];
}