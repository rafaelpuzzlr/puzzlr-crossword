// Sample data for words and clues
const crosswordData = {
  across: {
    1: { clue: "Opposite of 'stop'", answer: "GO", row: 0, col: 0 },
    4: { clue: "A fruit", answer: "APPLE", row: 2, col: 0 },
  },
  down: {
    2: { clue: "A color", answer: "GREEN", row: 0, col: 2 },
    3: { clue: "A planet", answer: "EARTH", row: 0, col: 4 },
  },
};

const gridSize = 10; // 10x10 grid
const grid = document.getElementById("crossword-grid");
let selectedCell = null;

// Create the crossword grid
function createGrid() {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-row", row);
      cell.setAttribute("data-col", col);
      cell.setAttribute("tabindex", "0"); // Make cells focusable
      cell.addEventListener("click", () => selectCell(cell));
      cell.addEventListener("keydown", handleKeyPress);
      grid.appendChild(cell);
    }
  }
}

// Select a cell
function selectCell(cell) {
  if (selectedCell) {
    selectedCell.classList.remove("selected");
  }
  selectedCell = cell;
  selectedCell.classList.add("selected");
  selectedCell.focus();
  highlightClue();
}

// Handle keyboard input
function handleKeyPress(event) {
  if (!selectedCell) return;

  const key = event.key.toUpperCase();
  if (/^[A-Z]$/.test(key)) {
    selectedCell.textContent = key;
    checkAnswer(selectedCell);
    moveToNextCell();
  } else if (event.key === "Backspace") {
    selectedCell.textContent = "";
    moveToPreviousCell();
  } else if (event.key.startsWith("Arrow")) {
    moveCell(event.key);
  }
}

// Move to the next cell
function moveToNextCell() {
  if (!selectedCell) return;

  const row = parseInt(selectedCell.getAttribute("data-row"));
  const col = parseInt(selectedCell.getAttribute("data-col"));
  const nextCell = document.querySelector(`.cell[data-row="${row}"][data-col="${col + 1}"]`);
  if (nextCell) selectCell(nextCell);
}

// Move to the previous cell
function moveToPreviousCell() {
  if (!selectedCell) return;

  const row = parseInt(selectedCell.getAttribute("data-row"));
  const col = parseInt(selectedCell.getAttribute("data-col"));
  const prevCell = document.querySelector(`.cell[data-row="${row}"][data-col="${col - 1}"]`);
  if (prevCell) selectCell(prevCell);
}

// Move cell based on arrow key
function moveCell(direction) {
  if (!selectedCell) return;

  const row = parseInt(selectedCell.getAttribute("data-row"));
  const col = parseInt(selectedCell.getAttribute("data-col"));
  let nextCell;

  switch (direction) {
    case "ArrowRight":
      nextCell = document.querySelector(`.cell[data-row="${row}"][data-col="${col + 1}"]`);
      break;
    case "ArrowLeft":
      nextCell = document.querySelector(`.cell[data-row="${row}"][data-col="${col - 1}"]`);
      break;
    case "ArrowDown":
      nextCell = document.querySelector(`.cell[data-row="${row + 1}"][data-col="${col}"]`);
      break;
    case "ArrowUp":
      nextCell = document.querySelector(`.cell[data-row="${row - 1}"][data-col="${col}"]`);
      break;
  }

  if (nextCell) selectCell(nextCell);
}

// Check if the entered letter is correct
function checkAnswer(cell) {
  const row = parseInt(cell.getAttribute("data-row"));
  const col = parseInt(cell.getAttribute("data-col"));
  const letter = cell.textContent.toUpperCase();

  for (const direction in crosswordData) {
    for (const number in crosswordData[direction]) {
      const { answer, row: startRow, col: startCol } = crosswordData[direction][number];
      if (direction === "across" && row === startRow && col >= startCol && col < startCol + answer.length) {
        const index = col - startCol;
        if (letter === answer[index]) {
          cell.classList.add("correct");
        } else {
          cell.classList.add("incorrect");
        }
      } else if (direction === "down" && col === startCol && row >= startRow && row < startRow + answer.length) {
        const index = row - startRow;
        if (letter === answer[index]) {
          cell.classList.add("correct");
        } else {
          cell.classList.add("incorrect");
        }
      }
    }
  }
}

// Highlight the active clue
function highlightClue() {
  if (!selectedCell) return;

  const row = parseInt(selectedCell.getAttribute("data-row"));
  const col = parseInt(selectedCell.getAttribute("data-col"));

  // Remove active class from all clues
  document.querySelectorAll("#clues li").forEach((li) => li.classList.remove("active"));

  for (const direction in crosswordData) {
    for (const number in crosswordData[direction]) {
      const { answer, row: startRow, col: startCol } = crosswordData[direction][number];
      if (direction === "across" && row === startRow && col >= startCol && col < startCol + answer.length) {
        document.querySelector(`#across-clues li[data-number="${number}"]`).classList.add("active");
      } else if (direction === "down" && col === startCol && row >= startRow && row < startRow + answer.length) {
        document.querySelector(`#down-clues li[data-number="${number}"]`).classList.add("active");
      }
    }
  }
}

// Display clues
function displayClues() {
  const acrossClues = document.getElementById("across-clues");
  const downClues = document.getElementById("down-clues");

  for (const direction in crosswordData) {
    for (const number in crosswordData[direction]) {
      const clue = crosswordData[direction][number].clue;
      const li = document.createElement("li");
      li.textContent = `${number}. ${clue}`;
      li.setAttribute("data-number", number);
      if (direction === "across") {
        acrossClues.appendChild(li);
      } else {
        downClues.appendChild(li);
      }
    }
  }
}

// Initialize the game
function init() {
  createGrid();
  displayClues();
}

init();
