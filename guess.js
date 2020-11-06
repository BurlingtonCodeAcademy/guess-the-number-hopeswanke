// ---------------- background functionality ---------------
// import readline for ask functionality
const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);
// function for await ask functionality
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}
// function to generate random integer between min and max set by user
function randomInt(min, max) {
  return Math.floor((Math.random() / 2) * (max - min + 1) + min);
}
// --------------------- Comp/Human choice -----------------
// calls choice function
choice();
// lets user choose which version to play
async function choice() {
  // set question to variable
  let start = await ask("human guess or computer guess? ");
  // if they choose human guess return startComp function
  
  if (start === "human guess") {
    return startHumanGuess();
  } else if (start === "computer guess") {
    // if they choose computer guess return startHuman function
    return startComputerGuess();
  } else{
    console.log('Please enter a valid option')
    process.exit()
  }


// -------------------- Computer Guessing Function ---------
// calls human guessing function
startHumanGuess();
async function startHumanGuess() {
  // sets max range to a variable
  let question = await ask("What number do you want your range till? ");
  // creates game fluidity
  console.log("Alright I am thinking of a number ");
  // hard codes min to 1
  let min = 1;
  // sets max to number inputted above
  let max = question;
  // sets computer number to random number using function defined above
  let compNumber = randomInt(min, max);
  // sets player guess to variable
  let playerGuess = await ask("What's your Guess? ");
  // parses guess from a string to a number
  playerGuess = parseInt(playerGuess);
  // if player guess is  on first try correct
  if (playerGuess === compNumber) {
    console.log("Damn you won!! Until next time foe!!");
    process.exit();
  }
  // if player guess is incorrect
  else {
    // creates loop for player to keep guessing until correct
    while (playerGuess !== compNumber) {
      // if the number is too low
      if (playerGuess < compNumber) {
        console.log("too low, try again");
      }
      // if the guess it too high
      else if (playerGuess > compNumber) {
        console.log("sorry! too high");
      }
      // if player is correct
      else {
        console.log("Yay you win!");
        process.exit();
      }
      // lets player guess again
      playerGuess = await ask("Care to try again? ");
      // if player answers no instead of a number exits game
      if (playerGuess === "no") {
        console.log("WASTED");
        process.exit();
      }
    }
  }
}
// --------------------- Human Guessing Function -----------
// calls computer guessing function
startComputerGuess();
async function startComputerGuess() {
  // sets range set by player to variable
  let question = await ask("What number do you want your range till? ");
  // sets players number to variable
  let secretNumber = await ask("What is your secret number?");
  // sets min
  let min = 1;
  // sets max to variable player set above
  let max = question;
  // sets computer guess to variable
  let compGuess = randomInt(min, max);
  // puts above variable in question from which allows player to say yes or no then sets response to variable
  let response = await ask(
    "Is this your number? " + compGuess + " yes or no? "
  );
  // if computer is correct first try
  if (response === "yes") {
    console.log("YAY!");
    process.exit();
  }
  // if computer is incorrect
  else {
    // creates loop for computer to keep guessing
    while (response !== "yes") {
      // sets clarifying question to variable
      let answer = await ask("Is your number higher or lower? ");
      // if number is higher
      if (answer === "higher") {
        //   resets the min to computer guess plus one
        min = compGuess + 1;
        // computes new guess with new min
        compGuess = randomInt(min, max);
      }
      // if number is lower
      else if (answer === "lower") {
        // sets max to computer guess minus one
        max = compGuess - 1;
        // regenerates guess with new max
        compGuess = randomInt(min, max);
      }
      // re-asks question with new number
      response = await ask(
        "Is this your number? " + compGuess + " yes or no? "
      );
      // if correct leaves loop and exits game
      if (response === "yes") {
        console.log("YAY!");
        process.exit();
      }
      // cheaters catch if player incorrectly answers no to computers guess
      else if (compGuess == secretNumber && response !== "yes") {
        console.log(
          "Better call the fire department...cause your pants are on fire!!!!"
        );
        process.exit();
      }
    }
  }
}
