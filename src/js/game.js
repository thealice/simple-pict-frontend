
class Game {
    constructor(team1, team2, theme) {
        this.team1 = new Team(team1);
        this.team2 = new Team(team2);
        this.teams = [this.team1, this.team2]
        if (theme.id === 0) {
            this.theme = { name: "All themes", id: 0, prompts: Prompt.all }
        } else {
            this.theme = theme;
        }
        this.prompts = this.theme.prompts
        this.turn = this.team1;
    }
}