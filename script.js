document.addEventListener('DOMContentLoaded', () => {
  const statusElement = document.getElementById('status');
  const boardElement = document.getElementById('board');
  const resetButton = document.getElementById('reset');
  const chooseXButton = document.getElementById('choose-x');
  const chooseOButton = document.getElementById('choose-o');
  const cells = document.querySelectorAll('.cell');

  let currentPlayer = null; 
  let boardState = Array(9).fill(null);
  let gameActive = false;

  
  function checkWinner() {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]             
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        return boardState[a];
      }
    }

    return boardState.includes(null) ? null : 'Tie';
  }

  
  function updateStatus() {
    const winner = checkWinner();
    if (winner) {
      statusElement.textContent = winner === 'Tie' ? "It's a tie!" : `${winner} wins!`;
      gameActive = false;
    } else {
      statusElement.textContent = `Current turn: ${currentPlayer}`;
    }
  }

  
  function handleCellClick(e) {
    if (!gameActive) return;

    const index = e.target.dataset.index;
    if (boardState[index]) return;

    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
  }

  
  function startGame(player) {
    currentPlayer = player;
    boardState.fill(null);
    cells.forEach(cell => {
      cell.textContent = '';
    });

    statusElement.textContent = `Current turn: ${currentPlayer}`;
    gameActive = true;
    boardElement.style.display = 'grid';
    resetButton.style.display = 'inline-block';
    document.querySelector('.selection').style.display = 'none';
  }

  
  chooseXButton.addEventListener('click', () => startGame('X'));
  chooseOButton.addEventListener('click', () => startGame('O'));
  resetButton.addEventListener('click', () => location.reload());

 
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
});
