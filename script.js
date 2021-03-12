"use-strict";

// Grabbing html elements
const startButton = document.getElementById("start-button");
const statsDiv = document.getElementById("stats");
const textDiv = document.getElementById("text");

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
  // Displaying the typing speed and typing text
  statsDiv.classList.remove("hide");
  textDiv.classList.remove("hide");
  startButton.classList.add("hide");

  // Listening for button press, starting the time and calculating wPM speed
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

    cursorCharacter.classList.add("cursor");
  });
});
