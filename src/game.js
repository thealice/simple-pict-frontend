
class Game {
    constructor(team1, team2, theme) {
        this.team1 = new Team(team1);
        this.team2 = new Team(team2);
        if (theme === 0) {
            this.theme = { name: "All themes", prompts: Prompt.all }
            this.prompts = Prompt.all
        } else {
            this.theme = Theme.all.find(themeObj => themeObj.id == theme);

            this.prompts = this.theme.prompts
        }
        this.scorecard = `${this.team1.name}: ${this.team1.score}<br />${this.team2.name}: ${this.team2.score}`;

        this.turn = this.team1;
    }
}