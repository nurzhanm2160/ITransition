class MovesTable {
    constructor(moves) {
        this.moves = moves;
        this.table = this.generateTable();
    }

    generateTable() {
        const size = this.moves.length;
        const table = Array.from(Array(size), () => Array(size));

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                table[i][j] = this.determineResult(this.moves[i], this.moves[j]);
            }
        }

        return table;
    }

    determineResult(move1, move2) {
        const index1 = this.moves.indexOf(move1);
        const index2 = this.moves.indexOf(move2);

        const movesCount = this.moves.length;
        const halfMoves = Math.floor(movesCount / 2);

        if (index1 === index2) {
            return "Draw";
        } else if ((index2 - index1 + movesCount) % movesCount <= halfMoves) {
            return "Win";
        } else {
            return "Lose";
        }
    }

    printTable() {
        const size = this.moves.length;
    
        console.log("Moves Table:");
        console.log(`+${'-'.repeat(12 + (size - 1) * 10)}+`);
        console.log(`| ${'v PC\\User >'.padEnd(11)} | ${this.moves.map(move => move.padEnd(8)).join('|')} |`);
        console.log(`+${'-'.repeat(12 + (size - 1) * 10)}+`);
    
        for (let i = 0; i < size; i++) {
            const row = [`${this.moves[i]}`.padStart(12)];
            for (let j = 0; j < size; j++) {
                row.push(this.table[i][j].padStart(8));
            }
            console.log(`| ${row.join('|')} |`);
            console.log(`+${'-'.repeat(12 + (size - 1) * 10)}+`);
        }
    }

    getMoveResult(playerMove, computerMove) {
        const playerIndex = this.moves.indexOf(playerMove);
        const computerIndex = this.moves.indexOf(computerMove);
        return this.table[playerIndex][computerIndex];
    }
}

module.exports = MovesTable;