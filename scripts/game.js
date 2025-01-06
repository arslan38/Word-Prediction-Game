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

// Initialize game
function initGame() {
    hiddenWord = "_".repeat(word.length).split("");
    score = 0;
    lives = 3;
    updateDisplay();
}

function updateDisplay() {
    wordArea.innerHTML = "";
    hiddenWord.forEach((char) => {
        const img = document.createElement("img");
        img.src = char === "_" ? "assets/blank.svg" : `assets/${char}.svg`;
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
        if (word.includes(guess)) {
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
        if (guess === word) {
            alert("You win!");
            score += 100;
            initGame();
            return;
        } else {
            alert("Incorrect word. You lose!");
            lives = 0;
        }
    }

    if (hiddenWord.join("") === word) {
        alert("You win!");
        score += 100;
        initGame();
    } else if (lives <= 0) {
        alert(`You lose! The word was ${word}`);
        initGame();
    } else {
        updateDisplay();
    }
}

// Event listeners
submitButton.addEventListener("click", handleGuess);
resetButton.addEventListener("click", initGame);

initGame();
