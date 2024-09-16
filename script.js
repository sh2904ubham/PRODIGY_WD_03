// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const restartButton = document.getElementById("restart");
    const toggleAIButton = document.getElementById("toggle-ai");
    const xWinsDisplay = document.getElementById("x-wins");
    const oWinsDisplay = document.getElementById("o-wins");
    const drawsDisplay = document.getElementById("draws");

    let currentPlayer = "X";
    let board = Array(9).fill(null);
    let gameActive = true;
    let xWins = 0;
    let oWins = 0;
    let draws = 0;
    let playAgainstAI = false;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleClick = (e) => {
        const cell = e.target;
        const index = cell.getAttribute("data-index");

        if (board[index] !== null || !gameActive) {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            message.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            updateScore(currentPlayer);
        } else if (board.every(cell => cell !== null)) {
            message.textContent = "It's a draw!";
            gameActive = false;
            updateScore("Draw");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            message.textContent = `Player ${currentPlayer}'s turn`;

            if (playAgainstAI && currentPlayer === "O") {
                setTimeout(makeAIMove, 500);
            }
        }
    };

    const checkWinner = () => {
        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    };

    const updateScore = (winner) => {
        if (winner === "X") {
            xWins++;
            xWinsDisplay.textContent = xWins;
        } else if (winner === "O") {
            oWins++;
            oWinsDisplay.textContent = oWins;
        } else if (winner === "Draw") {
            draws++;
            drawsDisplay.textContent = draws;
        }
    };

    const restartGame = () => {
        currentPlayer = "X";
        board = Array(9).fill(null);
        gameActive = true;
        message.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = "");
    };

    const toggleAI = () => {
        playAgainstAI = !playAgainstAI;
        toggleAIButton.textContent = `Play Against AI: ${playAgainstAI ? "On" : "Off"}`;
        restartGame();
    };

    const makeAIMove = () => {
        if (!gameActive) return;

        let emptyCells = [];
        board.forEach((cell, index) => {
            if (cell === null) {
                emptyCells.push(index);
            }
        });

        if (emptyCells.length > 0) {
            const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[randomIndex] = "O";
            cells[randomIndex].textContent = "O";

            if (checkWinner()) {
                message.textContent = `O wins!`;
                gameActive = false;
                updateScore("O");
            } else if (board.every(cell => cell !== null)) {
                message.textContent = "It's a draw!";
                gameActive = false;
                updateScore("Draw");
            } else {
                currentPlayer = "X";
                message.textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    };

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    restartButton.addEventListener("click", restartGame);
    toggleAIButton.addEventListener("click", toggleAI);
});
