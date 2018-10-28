
const Word = require("./word.js");
const inquirer = require("inquirer");
const isLetter = require("is-letter");
const colors = require("colors")

let gameData = {
    correctLetters: 0,
    guessedLetters: [],
    guessesRemaining: 10,
    wordsArray: ["RAT", "OX", "TIGER", "DRAGON", "SNAKE", "HORSE", "GOAT", "MONKEY", "DOG","PIG"],

    // Chooses a word randomly, splits the word, creates Letter objects and stores them in an array
    chooseWord: function () {
        var randomNumber = Math.floor(Math.random()* this.wordsArray.length);
        chosenWord = this.wordsArray[randomNumber]
        newWord = new Word(chosenWord);
        newWord.returnString();
    },
    startGame: function() {
        var that = this;

        inquirer.prompt([
            {
                name: "startGame",
                type: "confirm",
                message: "Would you like to play Constructor Word Guess?".bold.blue
            }
        ]).then(function(answer) {
            if(answer.startGame) {
                this.guessedLetters = [];
                this.guessesRemaining = 10;

                that.newGame();
            } else {
                console.log("Maybe next time, now signing off".bold.red);
            }
        });
    },

    restartGame: function() {
        var that = this;

        inquirer.prompt([
            {
                name: "startGame",
                type: "confirm",
                message: "Would you like to play again?".bold.blue
            }
        ]).then(function(answer) {
            if(answer.startGame) {
                this.guessedLetters = [];
                this.guessesRemaining = 10;

                that.newGame();
            } else {
                console.log("Thank you for playing, now signing off".bold.red);
            }
        });
    },
    
    
    newGame: function() {
        console.log("\n* * * * * * * * * * * * * * * * * *".rainbow);
        console.log("  Category: Chinese Zodiac Animals".bold.yellow);
        console.log("* * * * * * * * * * * * * * * * * *\n".rainbow);
        console.log("Guesses remaining: ", colors.yellow(this.guessesRemaining )+ "\n");
        this.chooseWord();
        this.promptForLetters();
        
    },
    
    promptForLetters: function() {
        var that = this;

        //prompt the user for letters
    if(this.guessesRemaining > 0) {
        inquirer.prompt([
            {
                name: "letterGuessed",
                type: "input",
                message: "Guess a letter".bold.blue,
                validate: function(value) {
                    if(isLetter(value)) {
                        return true;
                    }
                    return "Please enter single letter".bold.red
                }
            }
        ]).then(function(answer) {

            var userGuess = answer.letterGuessed.toUpperCase();
            console.log("User Guess: ", colors.yellow(userGuess));
            console.log(that.correctLetters);
            newWord.guess(userGuess);
            
            // Check if the userGuess is in the guessedLetters array
            if (that.guessedLetters.indexOf(userGuess) != -1) {
                console.log('\033c'); // Clears the terminal
                console.log("\n* * * * * * * * * * * * * * * * * *".rainbow);
                console.log("  Category: Chinese Zodiac Animals".bold.yellow);
                console.log("* * * * * * * * * * * * * * * * * *\n".rainbow);
                console.log("Guessed Letters:", that.guessedLetters);
                console.log("You've already guessed", colors.yellow(userGuess) + ". Please select a different letter.\n")
                console.log("Guesses Left:", colors.yellow(that.guessesRemaining) + "\n");

                newWord.returnString()
                that.promptForLetters();

            } else if (chosenWord.indexOf(userGuess) != -1) {
                console.log('\033c'); // Clears the terminal
                that.guessedLetters.push(userGuess);
                that.correctLetters++;

                if (that.correctLetters == chosenWord.length) {
                    console.log('\033c'); // Clears the terminal
                    console.log("\n* * * * * * * * * * * * * * * * * * * * * * *".rainbow);
                    console.log("\nCongratulations!!!! You guessed the word!!".bold.yellow);
                    console.log("\n* * * * * * * * * * * * * * * * * * * * * * *".rainbow);

                } else {
                    console.log('\033c'); // Clears the terminal
                    console.log("\n* * * * * * * * * * * * * * * * * *".rainbow);
                    console.log("  Category: Chinese Zodiac Animals".bold.yellow);
                    console.log("* * * * * * * * * * * * * * * * * *\n".rainbow);
                    console.log("Guessed Letters:", that.guessedLetters);
                    console.log(colors.red(userGuess) + " was correct!");
                    console.log("\nGuesses Left:", colors.yellow(that.guessesRemaining) + "\n");

                    newWord.returnString()
                    that.promptForLetters();
                }

            } else {
                console.log('\033c'); // Clears the terminal
                that.guessesRemaining--;
                that.guessedLetters.push(userGuess);
                console.log("\n* * * * * * * * * * * * * * * * * *".rainbow);
                console.log("  Category: Chinese Zodiac Animals".bold.yellow);
                console.log("* * * * * * * * * * * * * * * * * *\n".rainbow);
                console.log("Guessed Letters: ", that.guessedLetters);
                console.log(colors.red(userGuess) + " was not correct" + "\n");
                console.log("Guesses remaining: ", colors.yellow(that.guessesRemaining) +"\n")
                
                newWord.returnString()
                that.promptForLetters();
            }

         });

    } else {
        console.log("\n* * * * * * * * * * * * * * * * * *".rainbow);
        console.log("  Category: Chinese Zodiac Animals".bold.yellow);
        console.log("* * * * * * * * * * * * * * * * * *\n".rainbow);
        console.log("Game Over!\n")
        console.log("The mystery word was", colors.magenta(chosenWord));
     }
    } 
}

gameData.startGame();