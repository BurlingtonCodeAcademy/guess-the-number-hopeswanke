const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.question(questionText, resolve);
    });
}

choice()
async function choice() {
    let start = await ask('human guess or computer guess? ')
    if (start === 'human guess') {
       return startComp()
    }
    else if (start === 'computer guess') {
        return startHuman()
    }
}

function randomInt(min, max) {
    return Math.floor((Math.random()/2) * (max - min + 1) + min)
}

startComp();
async function startComp() {
    let game = await ask("Are you ready to start the game?")
    let question = await ask('What number do you want your range till? ')
    console.log('Alright I am thinking of a number ')
    let min = 1
    let max = question 
    let compNumber = randomInt(min, max)
    let playerGuess = await ask('What\'s your Guess? ')
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

startHuman();
async function startHuman() {
    let question = await ask('What number do you want your range till? ')
    let secretNumber = await ask("What is your secret number?");
    let min = 1
    let max = question 
    let compGuess = randomInt(min, max)
    let response = await ask('Is this your number? ' + compGuess + ' yes or no? ')
    if (response === 'yes') {
        console.log('YAY!')
        process.exit()
    }
    else {
        while (response !== 'yes') {
            let answer = await ask('Is your number higher or lower? ')
            if (answer === 'higher') {
                min = compGuess + 1
                compGuess = randomInt(min, max)
            }
            else if (answer === 'lower') {
                max = compGuess - 1
                compGuess = randomInt(min, max)
            }
            response = await ask('Is this your number? ' + compGuess + ' yes or no? ')
            if (response === 'yes') {
                console.log('YAY!')
                process.exit()
            }
            else if (compGuess == secretNumber && response !== "yes") {
                console.log('Better call the fire department...cause your pants are on fire!!!!')
                process.exit()
            }
        }
    }
}
