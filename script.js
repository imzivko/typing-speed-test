"use-strict";

// Grabbing html elements
const startButton = document.getElementById("start-button");
const statsDiv = document.getElementById("stats");
const textDiv = document.getElementById("text");
const clickSound = new Audio("sounds/buttonClick.mp3");
const inputText = document.getElementById("input-space");

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

// Initial time set to null
let startTime = null;
let endTime = null;

// Starting the game
startButton.addEventListener("click", function () {
  clickSound.play();
  inputText.focus();
  // Displaying the typing speed and typing text
  statsDiv.classList.add("hide");
  textDiv.classList.remove("hide");
  startButton.classList.add("hide");

  // Listening for button press, starting the time and calculating wPM
  const keyListener = document.addEventListener("keydown", ({ key }) => {
    console.log(key);

    // Timer starts when the user starts typing
    if (!startTime) {
      startTime = new Date();
    }

    if (key === cursorCharacter.innerText) {
      cursorCharacter.classList.remove("cursor");
      cursorCharacter.classList.remove("wrong");
      cursorCharacter.classList.add("done");
      cursorCharacter = characters[++cursorPosition];
    } else {
      cursorCharacter.classList.add("wrong");
    }

    // Calculations (time, wps, wpm..)
    if (cursorPosition >= characters.length) {
      endTime = new Date();
      const timeElapsed = endTime - startTime;
      const seconds = (timeElapsed / 1000).toFixed(1);
      const wordNumber = textLib.split(" ").length;
      const wps = (wordNumber / seconds).toFixed(1);
      const wpm = (wps * 60).toFixed(1);
      textDiv.classList.add("hide");
      statsDiv.classList.remove("hide");
      statsDiv.textContent = `${wpm}, ${wps}`;

      // Disable input listener at the end of the test
      document.removeEventListener("keydown", keyListener);
      return;
    }

    cursorCharacter.classList.add("cursor");
  });
});
