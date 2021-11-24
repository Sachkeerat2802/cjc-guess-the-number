"use strict";

let score = 20;
let highscore = 0;
let playingState = true;
let secretNumber = Math.floor(Math.random() * 20) + 1;

const displayMessage = (element, message) => {
    document.querySelector(element).textContent = message;
};

const toggleStyles = (type) => {
    document.querySelector("body").style.backgroundColor =
        type === "win" ? "#00ff00" : type === "loss" ? "#ff0000" : "#222222";
    document.querySelector(".hero__number").style.width =
        type === "win" ? "15rem" : null;
    displayMessage(
        ".posttext__label",
        type === "win"
            ? "You Win 👑"
            : type === "loss"
            ? "You lost 💀"
            : "Start Guessing..."
    );
    displayMessage(".posttext__score--value", score);
    displayMessage(
        ".hero__number",
        type === "win" ? secretNumber : type === "loss" ? "X" : "?"
    );
};

document.querySelector(".posttext__btn").addEventListener("click", function () {
    let guess = Number(document.querySelector(".posttext__input").value);

    if (!playingState) {
        displayMessage(".posttext__label", "Reset to Play Again!");
    } else if (!guess) {
        displayMessage(".posttext__label", "⛔️ Enter a Number");
    } else if (guess !== secretNumber) {
        if (score > 1) {
            displayMessage(
                ".posttext__label",
                guess > secretNumber ? "Too High 📈" : "Too Low 📉"
            );
            score--;
            document.querySelector(".posttext__score--value").textContent =
                score;
        } else {
            score--;
            playingState = false;
            toggleStyles("loss");
        }
    } else {
        if (score > highscore) {
            highscore = score;
            document.querySelector(".posttext__highscore--value").textContent =
                highscore;
        }
        playingState = false;
        toggleStyles("win");
    }
});

document.querySelector(".pretext__btn").addEventListener("click", function () {
    score = 20;
    secretNumber = Math.floor(Math.random() * 20) + 1;
    playingState = true;
    document.querySelector(".posttext__input").value = null;
    toggleStyles("normal");
});
