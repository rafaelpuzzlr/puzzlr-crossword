document.addEventListener("DOMContentLoaded", function () {
    const gridSize = 10;
    const grid = document.getElementById("crossword-grid");
    const acrossClues = document.getElementById("across-clues");
    const downClues = document.getElementById("down-clues");

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

    function createGrid() {
        grid.innerHTML = "";
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.setAttribute("data-row", row);
                cell.setAttribute("data-col", col);
                cell.contentEditable = true;
                grid.appendChild(cell);
            }
        }
    }

    function populateGrid() {
        for (const direction in crosswordData) {
            for (const number in crosswordData[direction]) {
                const { answer, row, col } = crosswordData[direction][number];
                for (let i = 0; i < answer.length; i++) {
                    const cell = document.querySelector(
                        `.cell[data-row="${direction === "across" ? row : row + i}"][data-col="${direction === "down" ? col : col + i}"]`
                    );
                    if (cell) {
                        cell.setAttribute("data-answer", answer[i].toUpperCase());
                    }
                }
            }
        }
    }

    function displayClues() {
        acrossClues.innerHTML = "";
        downClues.innerHTML = "";

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

    document.getElementById("check-btn").addEventListener("click", function () {
        document.querySelectorAll(".cell").forEach(cell => {
            const correctAnswer = cell.getAttribute("data-answer");
            if (correctAnswer) {
                cell.style.color = cell.textContent.toUpperCase() === correctAnswer ? "green" : "red";
            }
        });
    });

    document.getElementById("clear-btn").addEventListener("click", function () {
        document.querySelectorAll(".cell").forEach(cell => {
            cell.textContent = "";
            cell.style.color = "black";
        });
    });

    function init() {
        createGrid();
        populateGrid();
        displayClues();
    }

    init();
});

