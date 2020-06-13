
class Game {
    constructor(team1, team2, theme_id) {
        this.team1 = new Team(team1);
        this.team2 = new Team(team2);
        this.teams = [this.team1, this.team2]
        if (theme_id === 0) {
            this.theme = { name: "All themes", id: 0, prompts: Prompt.all }
        } else {
            this.theme = Theme.all.find(themeObj => themeObj.id == theme_id);
        }
        this.prompts = this.theme.prompts
        this.turn = this.team1;
    }
}