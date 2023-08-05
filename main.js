const process = require('process');
const readline = require('readline');

const MovesTable = require('./MovesTable');
const GameRules = require('./GameRules');
const HMACGenerator = require('./HMACGenerator');

const commandLineArguments = process.argv.slice(2);
const uniqueCommandLineArguments = [...new Set(commandLineArguments)];

const movesTable = new MovesTable(uniqueCommandLineArguments);
const gameRules = new GameRules(uniqueCommandLineArguments);

const argumentIsRepeated = uniqueCommandLineArguments.length !== commandLineArguments.length;

if (process.argv.length < 3 || argumentIsRepeated || uniqueCommandLineArguments.length % 2 !== 1) {
    console.log("Invalid number of arguments or duplicate moves. Please provide an odd number of unique moves.");
    process.exit(1);
}

console.log('Available moves:');
uniqueCommandLineArguments.forEach((move, index) => {
    console.log(`${index + 1} - ${move}`);
});
console.log('0 - exit');
console.log('? - help');

const hmacGenerator = new HMACGenerator();
const hmacKey = hmacGenerator.generateKey();
const computerMove = uniqueCommandLineArguments[Math.floor(Math.random() * uniqueCommandLineArguments.length)];
const hmac = hmacGenerator.generateHMAC(computerMove);

console.log(`HMAC: ${hmac}`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter your move (number): ', (playerMoveIndex) => {
    if (playerMoveIndex === '?') {
        movesTable.printTable();
        rl.close();
        return;
    }

    const index = parseInt(playerMoveIndex, 10);

    if (isNaN(index) || index < 1 || index > uniqueCommandLineArguments.length) {
        console.log("Invalid move. Please choose a valid move (number) from the available moves.");
        rl.close();
        return;
    }

    if (index === 0) {
        console.log("Goodbye!");
        rl.close();
        return;
    }

    const playerMove = uniqueCommandLineArguments[index - 1];

    console.log(`Your move: ${playerMove}`);
    console.log(`Computer move: ${computerMove}`);

    const winner = gameRules.getWinner(playerMove, computerMove);
    console.log(`Winner: ${winner}`);
    console.log(`HMAC Key: ${hmacKey}`);
    rl.close();
});