const answers =
    {
        currentWord: [],
        currentHint: "",
        giveHint: function () {
            $('#hint').on('click', function () {
                $(this).replaceWith(`<div class="hint-given">${answers.currentHint}</div>`)
            })
        },
        selectWordRandomly: function () {
            const randomIndex = Math.floor(Math.random() * this.collectionOfWords.length)
            this.collectionOfWords[randomIndex].word.split('').forEach((letter) => {
                this.currentWord.push({letter: letter, showing: false})
            })
            this.currentHint = this.collectionOfWords[randomIndex].hint
        },
        createLetterDivs: function (word) {
            $('#current-word-id').empty()
            $('#remaining-guesses').text(guesses.remaining)
            word.forEach((letter, index) => {
                $('#current-word-id').append(`<div id="word-letter-${index}" class="letter"><div>`)
            })
        },
        startNewRound: function () {
            this.currentWord = []
            guesses.remaining = 6
            guesses.incorrectLetters = []
            showAllAlphabetLetters()
            this.selectWordRandomly()
            this.createLetterDivs(this.currentWord)
        },
        reset: function() {
            // $('#reset').on('click', function() {
            //     answers.startNewRound()
            // })
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
            hint: "proprietary language used by engineers and scientists"
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
            console.log("guess2");
            const guessedLetter = $(this).text()
            let letterFound = false
            answers.currentWord.forEach((letter, index) => {
                if (letter.letter === guessedLetter) {
                    $(`#word-letter-${index}`).text(letter.letter)
                    letterFound = true
                    letter.showing = true
                }
            })
            if (!letterFound) {
                addLetterToIncorrect(guessedLetter)
                guesses.remaining -= 1
                $('#remaining-guesses').text(guesses.remaining)
                guesses.incorrectLetters.push(guessedLetter)
            }
            guesses.checkGuesses()
            $(this).fadeOut(500)
            guesses.checkWin()
        })
    },
    checkWin: function() {
        let countOfCorrectLetters = 0
        answers.currentWord.forEach((letter) => {
            if (letter.showing) {
                countOfCorrectLetters += 1
            }           
        })
        if(countOfCorrectLetters === answers.currentWord.length) {
            alert("You won!")
        }
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

const showAllAlphabetLetters = () => {
    $('#alphabet-id').empty()
    $('.incorrect-guesses').empty()
    const alphabetArray = 'abcdefghijklmnopqrstuvwxyz'.split('')
    alphabetArray.forEach((letter, index) => {
        $('#alphabet-id').append(`<div id="alpha-letter-${index}" class="alphabet-letter">${letter}<div>`)
    })
}

// const createLetterDivs = (word) => {
//     word.forEach((letter, index) => {
//         $('#current-word-id').append(`<div id="word-letter-${index}" class="letter"><div>`)
//     })
// }

const addLetterToIncorrect = (letter) => {
    $('.incorrect-guesses').append(`<div class="incorrect-letter">${letter}</div>`)
}



$(document).ready(function () {
    answers.selectWordRandomly()
    showAllAlphabetLetters()
    answers.createLetterDivs(answers.currentWord)
    guesses.makeGuess() 
    answers.giveHint()
    guesses.checkWin()
});
