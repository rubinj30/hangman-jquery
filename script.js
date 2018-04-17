const word =
    {
        currentWord: [],
        currentHint: "",

        selectWordRandomly: function () {
            const randomIndex = Math.floor(Math.random() * this.collectionOfWords.length)
            this.collectionOfWords[randomIndex].word.split('').forEach((letter) => {
                this.currentWord.push({ letter: letter, showing: false })
            })
            this.currentHint = this.collectionOfWords[randomIndex].hint
        },

        collectionOfWords: [{
            word: "testruby",
            hint: "hint1"
        },
        {
            word: "testpython",
            hint: "hint2"
        },
        {
            word: "testelixir",
            hint: "hint3"
        },
        {
            word: "testfortran",
            hint: "hint4"
        },
        {
            word: "testjava",
            hint: "hint5"
        },
        {
            word: "testcsharp",
            hint: "hint6"
        }],


    }

const guesses = {
    remaining: 10,
    incorrectLetters: [],
    makeGuess: function () {
        $('.alphabet-letter').on('click', function () {

            const guessedLetter = $(this).text()
            
            // loop thru array of letter objects
            let letterFound = false
            word.currentWord.forEach((letter, index) => {

                // if the clicked on letter === current letter in loop
                if(letter.letter === guessedLetter) {
                    $(`#word-letter-${index}`).text(letter.letter)
                    letterFound = true
                    console.log("LETTER",letter.letter)
                }               
            })
            if (!letterFound) {
                addLetterToIncorrect(guessedLetter)
                guesses.remaining -= 1
                guesses.incorrectLetters.push(guessedLetter)
            }
            console.log(guesses.remaining);
            
            $(this).fadeOut(1000)

            
        })
    }
}

const attemptToGuessLetter = (guessedLetter, word) => {

    word.forEach((item) => {
        if (item.letter === guessedLetter) {
            item.showing = true
        }
    })
    return word
}

// DOM Manipulation

const showAllAlphabetLetters = () => {
    const alphabetArray = 'abcdefghijklmnopqrstuvwxyz'.split('')
    alphabetArray.forEach((letter, index) => {
        $('#alphabet-id').append(`<div id="alpha-letter-${index}" class="alphabet-letter">${letter}<div>`)
    })
}

const createLetterDivs = (word) => {
    word.forEach((letter, index) => {
        $('#current-word-id').append(`<div id="word-letter-${index}" class="letter"><div>`)
    })
}

const addLetterToIncorrect = (letter) => {
    $('.incorrect-guesses').append(`<div class="incorrect-letter">${letter}</div>`)
}

word.selectWordRandomly()

$(document).ready(function () {


    showAllAlphabetLetters()

    createLetterDivs(word.currentWord)

    guesses.makeGuess()
});


// const showDivsForLetters = (hangmanWord) => {

//     hangmanWord.forEach((letter) => {
//         if (hangmanWord.showing) {
//             $('#current-word-id').append(`<div class="word-letter">${letter.letter}<div>`)
//         } else {
//             $('#current-word-id').append(`<div class="word-letter"><div>`)            
//         }
//     })


//     // else {
//     //     
//     // }
// }