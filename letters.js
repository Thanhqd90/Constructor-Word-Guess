//Constructor function Letter for letters being in a word, if a letter has been guessed and displaying underscores in place of unguessed letters

function Letter(letterInWord) {
    this.letter = letterInWord,
    this.hasBeenGuessed = false,
    this.showLetter = function() {

        if (this.hasBeenGuessed === true) {
            return this.letter;
        } else {
           return " _";    
        }
    };

// Accepts letter as an argument and checks it against the hidden word, updating to true if it was guessed correctly
    this.checkLetter = function(letterGuessed) {

        if (letterGuessed.toUpperCase() === this.letter.toUpperCase()) {
            this.hasBeenGuessed = true;
        }
    };
};

module.exports = Letter;