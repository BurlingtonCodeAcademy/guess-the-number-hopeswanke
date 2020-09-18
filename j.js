const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

startComp();


async function startComp() {
    let game = await ask("Are you ready to start the game?")
    console.log('Alright I am thinking of a number ')
    let min = 1
    let max = 10
    let compNumber = randomInt(min, max)
    let playerGuess = await ask('What\'s your Guess?')
        playerGuess = parseInt(playerGuess)
    if (playerGuess === compNumber) {
        console.log('Damn you won!! Until next time foe!!')
        process.exit()
    }
    else {
        while (playerGuess !== compNumber) {
            if (playerGuess < compNumber) {
                console.log('too low, try again')
            }

            else if (playerGuess > compNumber) {
                console.log('sorry! too high')
            }
            else {
                console.log('Yay you win!')
                process.exit()
            }
            playerGuess = await ask('Care to try again? ')
            if (playerGuess === 'no') {
                console.log('WASTED')
                process.exit()
            }
           
        }
    }
}