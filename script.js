"use-strict";

// Grabbing html elements
const startButton = document.getElementById("start-button");
const statsDiv = document.getElementById("stats");
const textDiv = document.getElementById("text");
const clickSound = new Audio("sounds/buttonClick.mp3");
// Stats list
const time = document.getElementById("time-elapsed");
const wordsPerMin = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");
const correctInput = document.getElementById("correctInput");
const incorrectInput = document.getElementById("incorrectInput");

// Split words.js text into letters and put them in a newly created span element in HTML
const textIntoCharacters = textLib.split("");

const characters = textIntoCharacters.map((char) => {
  const span = document.createElement("span");
  span.innerText = char;
  textDiv.appendChild(span);
  return span;
});

// Hiding game elements before game start
textDiv.classList.add("hide");
statsDiv.classList.add("hide");

// Typing - Starting positition
let cursorPosition = 0;
let cursorCharacter = characters[cursorPosition];
cursorCharacter.classList.add("cursor");

// Tracking right/wrong input just for display after game ends
let wrongLetters = 0;
let correctLetters = 0;

// Initial time set to null
let startTime = null;
let endTime = null;

// Starting the game
startButton.addEventListener("click", function () {
  clickSound.play();
  // Displaying text
  textDiv.classList.remove("hide");
  startButton.classList.add("hide");

  // Listening for button press, starting the time
  const keyListener = document.addEventListener("keypress", ({ key }) => {
    console.log(key);

    // Time starts when the user starts typing
    if (!startTime) {
      startTime = new Date();
    }

    if (key === cursorCharacter.innerText) {
      cursorCharacter.classList.remove("cursor");
      cursorCharacter.classList.remove("wrong");
      cursorCharacter.classList.add("done");
      cursorCharacter = characters[++cursorPosition];
      correctLetters++;
    } else {
      cursorCharacter.classList.add("wrong");
      cursorCharacter.classList.remove("done");
      cursorCharacter.classList.remove("cursor");
      cursorCharacter = characters[--cursorPosition];
      wrongLetters++;
    }

    // Calculations, ending time
    if (cursorPosition >= characters.length) {
      endTime = new Date();
      const timeElapsed = endTime - startTime;
      const seconds = (timeElapsed / 1000).toFixed(1);
      const wordNumber = textLib.split(" ").length;
      const wps = (wordNumber / seconds).toFixed(1);
      const wpm = (wps * 60).toFixed(1);

      textDiv.classList.add("hide");

      // Stats
      correctLetters -= 2 * wrongLetters;
      statsDiv.classList.remove("hide");

      time.textContent = `${seconds}s`;
      wordsPerMin.textContent = `${wpm}`;
      accuracy.textContent = `${(
        (correctLetters / characters.length) *
        100
      ).toFixed(1)}%`;
      correctInput.textContent = ` ${correctLetters}`;
      incorrectInput.textContent = `${wrongLetters}`;

      // Disable input listener on game end
      document.removeEventListener("keydown", keyListener);
      return;
    }

    cursorCharacter.classList.add("cursor");
  });
});
