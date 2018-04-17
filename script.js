const collectionOfWords = [{
    word: "test1ruby",
    hint: "hint1"
},
{
    word: "test2python",
    hint: "hint2"
},
{
    word: "test3elixir",
    hint: "hint3"
},
{
    word: "test4fortran",
    hint: "hint4"
},
{
    word: "test5java",
    hint: "hint5"
},
{
    word: "test2csharp",
    hint: "hint6"
}]

const guesses = {
    remaining: 10,
    incorrectLetters: []
}


const selectWordRandomly = (words) => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const selectedWord = words[randomIndex].word.split('').map((letter) => {
        return { letter: letter, showing: false }
    })
    return selectedWord
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

const showAlphabetLetters = () => {
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
    $('.incorrect-guesses').append(`<div>${letter}</div>`)
}


const makeGuess = () => {
    $('.alphabet-letter').on('click', function () {
        const guessedLetter = $(this).text()
        guesses.remaining -= 1
        console.log(guesses.remaining);
        $(this).remove()
        guesses.incorrectLetters.push(guessedLetter)        
        addLetterToIncorrect(guessedLetter)
    })
}





const randomlySelectedWord = selectWordRandomly(collectionOfWords)
const currentWordAfterGuess = attemptToGuessLetter("t", randomlySelectedWord)

$(document).ready(function () {
    showAlphabetLetters()

    createLetterDivs(randomlySelectedWord)
    
    makeGuess()
});


// const showDivsForLetters = (word) => {
//     if (letter.showing) {
//         $('#current-word-id').append(`<div class="word-letter">${letter.letter}<div>`)
//     }
//     else {
//         $('#current-word-id').append(`<div class="word-letter"><div>`)
//     }
// }