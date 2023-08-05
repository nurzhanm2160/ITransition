const MovesTable = require('./MovesTable')

class GameRules {
    constructor(moves) {
        this.moveTable = new MovesTable(moves);
    }

    getWinner(playerMove, computerMove) {
        const result = this.moveTable.getMoveResult(playerMove, computerMove);
        return result === "Win" ? "Player" : result === "Lose" ? "Computer" : "Draw";
    }
}

module.exports = GameRules;