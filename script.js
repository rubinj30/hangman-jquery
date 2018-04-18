const answers =
    {
        currentWord: [],
        currentHint: "",
        giveHint: function () {
            $('#hint').on('click', function () {
                $(this).text(answers.currentHint)
            })
        },
        selectWordRandomly: function () {
            const randomIndex = Math.floor(Math.random() * this.collectionOfWords.length)
            this.collectionOfWords[randomIndex].word.split('').forEach((letter) => {
                this.currentWord.push(letter)
            })
            this.currentHint = this.collectionOfWords[randomIndex].hint
        },

        collectionOfWords: [{
            word: "ruby",
            hint: "created by Ykihiro Matsumoto"
        },
        {
            word: "python",
            hint: "leverages whitespace as syntax"
        },
        {
            word: "elixir",
            hint: "functional language designed for building scalable applications"
        },
        {
            word: "fortran",
            hint: "originally developed by IBM"
        },
        {
            word: "typescript",
            hint: "maintained by Microsoft"
        },
        {
            word: "javascript",
            hint: "originally written in 10 days"
        },
        {
            word: "swift",
            hint: "developed by Apple"
        },
        {
            word: "matlab",
            hint: "proprietary programming language commonly used by engineers and scientists"
        }]
    }

const guesses = {
    remaining: 6,
    incorrectLetters: [],
    checkGuesses: function () {
        if (guesses.remaining === 1) {
            $('#remaining-guesses').replaceWith(`<div id="last-guess">${guesses.remaining}</div>`)
        }
        else if (guesses.remaining === 0) {
            $('#last-guess').text(0)
            setTimeout(() => alert("Reload the page and start a new round"), 1000)
        }
    },
    makeGuess: function () {
        $('.alphabet-letter').on('click', function () {
            const guessedLetter = $(this).text()
            let letterFound = false
            answers.currentWord.forEach((letter, index) => {
                if (letter === guessedLetter) {
                    $(`#word-letter-${index}`).text(letter)
                    letterFound = true
                    console.log("LETTER", letter)
                }
            })
            if (!letterFound) {
                addLetterToIncorrect(guessedLetter)
                guesses.remaining -= 1
                $('#remaining-guesses').text(guesses.remaining)
                guesses.incorrectLetters.push(guessedLetter)
            }
            guesses.checkGuesses()
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

answers.selectWordRandomly()

$(document).ready(function () {

    showAllAlphabetLetters()

    createLetterDivs(answers.currentWord)

    guesses.makeGuess()
    
    answers.giveHint()
});
