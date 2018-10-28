var Letter = require("./letters.js")

// Word Constructor
function Word(chosenWord) {
    this.chosenWord = chosenWord,
    this.arrayOfLetterObjects = chosenWord.split("").map(function(char) {
        return new Letter(char);
    });

    // Returns a string representing the word
    this.returnString = function() {
        strWord = "";
            for (var i = 0; i < this.arrayOfLetterObjects.length; i++) {

                strWord += this.arrayOfLetterObjects[i].showLetter();
            }
        
        // Prints the dashes or updates with letters
        console.log(strWord);
    };

    // Checks guessed letter to the index of the letters of the chosen word
    this.guess = function(letterGuessed) {
        for (var i = 0; i < this.arrayOfLetterObjects.length; i++) {
            this.arrayOfLetterObjects[i].checkLetter(letterGuessed);
        } 
    };
};

module.exports = Word;