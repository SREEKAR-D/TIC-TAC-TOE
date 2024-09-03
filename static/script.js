const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const statusDiv = document.getElementById('status');
const resultDiv = document.getElementById('result');
let currentPlayer = 'X';
let board = Array(9).fill(null);

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];
    
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes(null) ? null : 'Tie';
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (board[index] || checkWinner()) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        if (winner === 'Tie') {
            resultDiv.textContent = "It's a tie!";
        } else {
            resultDiv.textContent = `${winner} won the Game`;
        }
        statusDiv.textContent = '';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDiv.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    board = Array(9).fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    statusDiv.textContent = `Player ${currentPlayer}'s turn`;
    resultDiv.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
