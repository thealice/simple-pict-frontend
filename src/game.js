
class Game {
    constructor(team1, team2, theme="all") {
        this.team1 = team1;
        this.team2 = team2;
        this.theme = theme;
        this.scoreCard = `${team1.name}: ${team1.score}, ${team2.name}: ${team2.score}`
    }
}