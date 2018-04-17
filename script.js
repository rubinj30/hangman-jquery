const word =
    {
        currentWord: [],
        currentHint: "",

        selectWordRandomly: function () {
            const randomIndex = Math.floor(Math.random() * this.collectionOfWords.length)
            this.collectionOfWords[randomIndex].word.split('').forEach((letter) => {
                this.currentWord.push(letter)
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
        }]
    }

const guesses = {
    remaining: 6,
    incorrectLetters: [],
    decreaseRemaining: function () {
        $('#remaining-guesses').text(`${this.remaining}`)
    },
    makeGuess: function () {
        $('.alphabet-letter').on('click', function () {
            const guessedLetter = $(this).text()
            let letterFound = false
            word.currentWord.forEach((letter, index) => {
                if(letter === guessedLetter) {
                    $(`#word-letter-${index}`).text(letter)
                    letterFound = true
                    console.log("LETTER",letter)
                }               
            })
            if (!letterFound) {
                addLetterToIncorrect(guessedLetter)
                guesses.remaining -= 1
                $('#remaining-guesses').text(guesses.remaining)
                guesses.incorrectLetters.push(guessedLetter)
            }           
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
