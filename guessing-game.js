let secretNumber;
numAttempts = 5;

// Create interface to allow for user input/output
const { Console } = require('node:console');
const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askLimit() {
    rl.question("Enter a max number of attempts allowed: ", (answer) => {
        numAttempts = Number(answer);
        askRange();
    })
}

// This method asks the user to enter a minimum number and then ask them to enter a maximum number. 
function askRange() {
    rl.question("Enter a max number: ", (answer1) => {
        rl.question("Enter a min number: ", (answer2) => {

            let minNum = Number(answer2);
            let maxNum = Number(answer1);

            let message = `I\'m thinking of a number between ${minNum} and ${maxNum}...`

            console.log(message);

            // Generate secret number
            secretNumber = randomInRange(minNum, maxNum);

            // Ask guesss and play game
            askGuess();
        })
    })
}


// The method should use the readline module's question method to ask the user to 'Enter a guess: 
// function calls the checkGuess function 
function askGuess() {

    if (numAttempts === 0) {
        return console.log("You Lose");
    }

    rl.question("Enter a guess: ", (answer) => {

        // if checkGuess returns false, recall function
        if (checkGuess(Number(answer)) === false) {
            numAttempts--
            askGuess();
        }

        // else correct guess, you win!
        else {
            console.log("You win!")
            rl.close();
        }
    })
}

// Function named checkGuess that accepts a number as an argument. 
// It should compare that argument against the global secretNumber
function checkGuess(number) {
    if (number > secretNumber) {
        console.log("Too high");
        return false;
    }
    else if (number < secretNumber) {
        console.log("Too low")
        return false;
    }
    else {
        console.log("Correct!");
        return true;
    }
}

// Helper function to generate a number between minNum and maxNum
function randomInRange(minNum, maxNum) {
    min = Math.ceil(minNum);
    max = Math.floor(maxNum);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}


askLimit();