const wordList = {
    0: "ADIEU",
    1: "SYNTH",
    2: "STOCK",
    3: "NYMPH",
    4: "BLAST",
    5: "UNITY",
    6: "PRISM",
    7: "CHEST",
    8: "CLOUD",
    9: "BLINK"
};

const usedLettersContainer = document.getElementById("used-letters");
let usedLetters = [];
const studentIDLastDigit = 4; // My ID: 150200314
const word = wordList[studentIDLastDigit];
let hiddenWord = "_".repeat(word.length).split("");
let score = 0;
let lives = 3;

// DOM elements
const wordArea = document.getElementById("word-area");
const scoreDisplay = document.getElementById("score");
const livesDisplay = document.getElementById("lives");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit-guess");
const resetButton = document.getElementById("reset-game");

// Focus input field when page loaded
window.onload = () => {
    guessInput.focus();
};

function initGame() {
    hiddenWord = "_".repeat(word.length).split("");
    score = 0;
    lives = 3;
    usedLetters = [];
    updateDisplay();
    updateUsedLetters();
}

function getBlankSvg() {
    return document.body.classList.contains('dark-theme') ? 'assets/blank-dark.svg' : 'assets/blank.svg';
}

function updateUsedLetters() {
    usedLettersContainer.innerHTML = usedLetters.map(letter => `<span>${letter}</span>`).join("");
}

function updateDisplay() {
    wordArea.innerHTML = "";
    hiddenWord.forEach((char) => {
        const img = document.createElement("img");
        img.src = char === "_" ? getBlankSvg() : `assets/${char}.svg`;
        img.alt = char;
        wordArea.appendChild(img);
    });

    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives + " " + "❤️".repeat(lives);
}

function handleGuess() {
    const guess = guessInput.value.toUpperCase().trim();
    guessInput.value = "";

    if (!guess) {
        alert("Please enter a valid letter or word!");
        return;
    }

    if (guess.length === 1) {
        usedLetters.push(guess);
        updateUsedLetters();
        
        if (word.includes(guess)) {
            // letter guess
            score += 20;
            for (let i = 0; i < word.length; i++) {
                if (word[i] === guess) {
                    hiddenWord[i] = guess;
                }
            }
        } else {
            lives--;
        }
    } else if (guess.length === word.length) {
        // Full word guess
        if (guess === word) {
            score += 100;
            updateDisplay();
            setTimeout(() => {
                alert("You win!");
                initGame();
            }, 100);
            return; // exit early if player wins
        } else {
            alert(`Incorrect word. You lose! The word was ${word}`);
            initGame(); 
            return;
        }
    } else {
        alert("Invalid input. Please enter one letter or a full word.");
    }

    updateDisplay();

    if (hiddenWord.join("") === word) {
        score += 100;
        setTimeout(() => {
            alert("You win!");
            initGame();
        }, 100);// delay to make sure last letter is visible    
    } else if (lives <= 0) {
        setTimeout(() => {
            alert(`You lose! The word was ${word}`);
            initGame();
        }, 100);
    }
}

// listen enter key
guessInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleGuess(); 
    }
});

// Event listeners
submitButton.addEventListener("click", handleGuess);
resetButton.addEventListener("click", initGame);

initGame();
