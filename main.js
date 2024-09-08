const mainMenu = document.querySelector(".main-menu");
const clickableArea = document.querySelector(".clickable-area");
const message = document.querySelector(".clickable-area .message");

let timer;
let greenDisplayed = false;
let startTime;
let waitingForStart = false;
let waitingForGreen = false;

function setGreenColor() {
    clickableArea.style.backgroundColor = "#32cd32";
    message.innerHTML = "Click Now!";
    message.style.color = "#111";
    greenDisplayed = true;
    startTime = Date.now();
}

function startGame() {
    waitingForStart = false;
    waitingForGreen = true;
    clickableArea.style.backgroundColor = "#c1121f";
    message.innerHTML = "Wait for the Green Color.";
    message.style.color = "white";

    let randomNumber = Math.floor(Math.random() * 5000 + 2000);
    timer = setTimeout(setGreenColor, randomNumber);

}

mainMenu.addEventListener("click", () => {
    mainMenu.classList.remove("active");
    startGame();
})

function displayReactionTime(reactionTime) {
    clickableArea.style.backgroundColor = "#faf0ca";
    message.innerHTML = `<div class='reaction-time-text'>${reactionTime} ms. Click to play again.</div>.`
    greenDisplayed = false;
    waitingForStart = true;
}

function displayTooSoon() {
    clickableArea.style.backgroundColor = "#faf0ca";
    message.innerHTML = "Too Soon. Click to replay."
    message.style.color = "#111";
    waitingForStart = true;
    clearTimeout(timer);
}

clickableArea.addEventListener("click", ()=> {
    if (greenDisplayed) {
        let clickTime = Date.now();
        let reactionTime = clickTime - startTime;
        displayReactionTime(reactionTime);
    }
    else if (waitingForStart) {
        startGame();
    }
    else if (waitingForGreen) {
        displayTooSoon();
    }
})