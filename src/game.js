
class Game {
    constructor(team1, team2, theme="all") {
        this.team1 = new Team(team1);
        this.team2 = new Team(team2);
        if (theme === "all") {
            this.theme = "All themes"
            this.prompts = Prompt.all
        } else {
            this.theme = Theme.all.find(themeObj => themeObj.name === theme);
            this.prompts = this.theme.prompts
        }
        // this.theme = Theme.all.find(theme);
        this.scorecard = `${this.team1.name}: ${this.team1.score}, ${this.team2.name}: ${this.team2.score}`;
        console.log(this);
    }
}