"use strict";

// Grabbing html elements
//Buttons
const startButton = document.getElementById("start-button");
const retryButton = document.getElementById("retry-button");
// Typing content
const textDiv = document.getElementById("text");
// Sounds
const clickSound = new Audio("sounds/buttonClick.mp3");
// Stats elements
const statsDiv = document.getElementById("stats");
const time = document.getElementById("time-elapsed");
const wordsPerMin = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");
const correctInput = document.getElementById("correctInput");
const incorrectInput = document.getElementById("incorrectInput");

// Hiding elements before game start
textDiv.classList.add("hide");
statsDiv.classList.add("hide");
retryButton.classList.add("hide");

// get a random quote
let quote;

async function getQuote() {
  const results = await fetch("https://api.quotable.io/random");
  const data = await results.json();
  quote = data.content;
}

getQuote();

// Wrapping everything in a start button listener
startButton.addEventListener("click", function () {
  clickSound.play();

  // Displaying elements, hiding start button
  textDiv.classList.remove("hide");
  retryButton.classList.remove("hide");
  startButton.classList.add("hide");

  // Split text into characters
  const textIntoCharacters = quote.split("");

  const characters = textIntoCharacters.map((char) => {
    const span = document.createElement("span");
    span.innerText = char;
    textDiv.appendChild(span);
    return span;
  });

  // Typing - Starting positition
  let cursorPosition = 0;
  let cursorCharacter = characters[cursorPosition];
  cursorCharacter.classList.add("cursor");

  // Tracking right/wrong input just for statistics
  let wrongLetters = 0;
  let correctLetters = 0;

  // Setting initial time to null
  let startTime = null;
  let endTime = null;

  // Listening for button press, starting the time
  const keypress = ({ key }) => {
    // Time only starts when user starts typing
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
      cursorCharacter = characters[cursorPosition];
      wrongLetters++;
    }

    // Calculating stats, ending time
    if (cursorPosition >= characters.length) {
      endTime = new Date();
      const timeElapsed = endTime - startTime;
      const seconds = (timeElapsed / 1000).toFixed(1);
      const wordNumber = quote.split(" ").length;
      const wps = (wordNumber / seconds).toFixed(1);
      const wpm = (wps * 60).toFixed(1);

      // Removing key listening at game end
      document.removeEventListener("keypress", keypress);

      // Hide text when game is done
      textDiv.classList.add("hide");

      // Stats that are displayed at game end
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
      return;
    }
    cursorCharacter.classList.add("cursor");
  };
  document.addEventListener("keypress", keypress);
});
