var game,
    newGameButton = document.getElementById('new-game'),
    alertModal = new bootstrap.Modal(document.getElementById('alert-modal'));

newGameButton.addEventListener('click', createNewGame);
createNewGame();

function createNewGame() {
    let tableLenght = document.getElementById('table-length').value;

    game = new TicTacToeGame(tableLenght);
    createTable();
    refreshTable();
}

function createTable() {
    let container = document.getElementById('gameboard');
    container.innerHTML = '';

    for (let i = 0; i < game.tableLength; i++) {
        let cells = [];
        for (let j = 0; j < game.tableLength; j++) {
            cells.push(`<div id="cell-${i}-${j}" class="col cell"></div>`);
        }
        container.appendChild(createElementFromHTML(`<div class="row">${cells.join('')}</div>`));
    }

    let cells = document.querySelectorAll('#gameboard .row .cell');

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', (e) => {
            let splitCellId = e.target.id.split('-'),
                i = splitCellId[1],
                j = splitCellId[2];
    
                let playResult = game.play(i, j);

                if (playResult > 0) {
                    document.getElementById('alert-title').innerHTML = 'ERROR!';
                  
                    if (playResult === 1) {
                        document.getElementById('alert-text').innerHTML = 'Invalid move!';
                    } else {
                        document.getElementById('alert-text').innerHTML = "This game has finished.";
                    }
                    
                    alertModal.show();
                } else {
                    refreshTable();

                    if (game.gameStatus > 0) {
                        if (game.gameStatus === 1) {
                            for (let i = 0; i < game.winnerPositions.length; i++) {
                                const position = game.winnerPositions[i];
                                document.getElementById(`cell-${position[0]}-${position[1]}`).classList.add(game.currentPlayer === 1 ? 'x-won-position' : 'o-won-position');
                            }

                            document.getElementById('alert-title').innerHTML = 'CONGRATULATIONS!';
                            document.getElementById('alert-text').innerHTML = `${game.currentPlayer === 1 ? 'Apple' : 'Windows' } won!`;
                        } else {
                            document.getElementById('alert-title').innerHTML = 'GOOD JOB!';
                            document.getElementById('alert-text').innerHTML = "It's a DRAW!";
                        }
                        
                        alertModal.show();
                    }
                }
        });
    }
}

function refreshTable() {
    for (let i = 0; i < game.tableLength; i++) {
        for (let j = 0; j < game.tableLength; j++) {
            let playClass;

            switch (game.table[i][j]) {
                case 1:
                    playClass = 'play-x';
                    break
                case 2:
                    playClass = 'play-o';
                    break
                default:
                    playClass = '';
                    break
            }

            if (playClass.length > 0) {
                document.getElementById(`cell-${i}-${j}`).classList.add(playClass);
            }
        }
    }
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}
