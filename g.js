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

startHuman();


async function startHuman() {
  let secretNumber = await ask("What is your secret number?");

  let min = 1
  let max = 100
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
