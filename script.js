const grid = document.querySelector('.grid');
const rows = 10;
const cols = 10;
const mines = 10;
const screenWidth = window.screen.width;

console.log(screenWidth);

let board = [];
let revealedCount = 0;
let flaggedCount = 0;
let whedthblock;



function createBoard() {
    // Создаем пустое поле
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < cols; c++) {
            row.push({
                mine: false,
                revealed: false,
                flagged: false,
                adjacentMines: 0
            });
        }
        board.push(row);
    }

    // Расставляем мины
    let minesPlaced = 0;
    while (minesPlaced < mines) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);
        if (!board[r][c].mine) {
            board[r][c].mine = true;
            minesPlaced++;
        }
    }

    // Рассчитываем количество мин вокруг каждой клетки
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (!board[r][c].mine) {
                let count = 0;
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        let nr = r + dr;
                        let nc = c + dc;
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].mine) {
                            count++;
                        }
                    }
                }
                board[r][c].adjacentMines = count;
            }
        }
    }
}

function renderBoard() {
    grid.innerHTML = '';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            if (board[r][c].revealed) {
                cell.classList.add('revealed');
                if (board[r][c].mine) {
                    cell.classList.add('mine');
                } else {
                    cell.textContent = board[r][c].adjacentMines || '';
                }
            } else if (board[r][c].flagged) {
                cell.classList.add('flagged');
            }
            grid.appendChild(cell);
        }
    }
}

function revealCell(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c].revealed || board[r][c].flagged) {
        return;
    }

    board[r][c].revealed = true;
    revealedCount++;

    if (board[r][c].mine) {
        alert('Game Over!');
        renderBoard();
        return;
    }

    if (board[r][c].adjacentMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                revealCell(r + dr, c + dc);
            }
        }
    }

    if (revealedCount === rows * cols - mines) {
        alert('You Win!');
        renderBoard();
        return;
    }

    renderBoard();
}

function toggleFlag(r, c) {
    if (board[r][c].revealed) {
        return;
    }

    board[r][c].flagged = !board[r][c].flagged;
    if (board[r][c].flagged) {
        flaggedCount++;
    } else {
        flaggedCount--;
    }

    renderBoard();
}

grid.addEventListener('click', (event) => {
    let row = parseInt(event.target.dataset.row);
    let col = parseInt(event.target.dataset.col);
    revealCell(row, col);
});

grid.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    let row = parseInt(event.target.dataset.row);
    let col = parseInt(event.target.dataset.col);
    toggleFlag(row, col);
});

createBoard();
renderBoard();

if (screenWidth<430)
    {
        whedthblock= screenWidth/(cols+2);
        
        div_game = document.querySelector(".grid");
        div_game.style.setProperty('grid-template-columns', 'repeat(10,'+ whedthblock+'px)');
        div_game.style.setProperty('grid-template-rows', 'repeat(10,'+ whedthblock+'px)');
        cells = document.querySelectorAll('.cell');
        console.log(cells)
        cells.forEach(element => {
            element.style.setProperty("width", whedthblock.toString()+"px");
            element.style.setProperty("height", whedthblock.toString() +"px");
        });
        
        
    }