// 1. Get the grid container element.
const gridContainer = document.querySelector('.grid');

// 2. (This is the most crucial part - replace with your actual grid generation logic)
// Example:  Create a 10x10 grid (replace with your actual grid creation)
let gridHTML = "";
for (let i = 0; i < 10; i++) {
    gridHTML += "<div class='row'>";
    for (let j = 0; j < 10; j++) {
        gridHTML += "<div class='cell'></div>";
    }
    gridHTML += "</div>";
}

gridContainer.innerHTML = gridHTML;


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

// Create the crossword grid
function createGrid() {
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-row", row);
      cell.setAttribute("data-col", col);
      cell.setAttribute("contenteditable", "true");
      grid.appendChild(cell);
    }
  }
}

// Populate the grid with answers
function populateGrid() {
  for (const direction in crosswordData) {
    for (const number in crosswordData[direction]) {
      const { answer, row, col } = crosswordData[direction][number];
      for (let i = 0; i < answer.length; i++) {
        const cell = document.querySelector(
          `.cell[data-row="${direction === "across" ? row : row + i}"][data-col="${direction === "down" ? col : col + i}"]`
        );
        if (cell) {
          cell.textContent = answer[i].toUpperCase();
          cell.setAttribute("data-answer", answer[i].toUpperCase());
          cell.setAttribute("readonly", "true");
        }
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
  populateGrid();
  displayClues();
}

init();
