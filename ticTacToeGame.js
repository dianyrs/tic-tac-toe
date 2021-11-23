class TicTacToeGame {
    // Cells:
    // 0 empty cell
    // 1 player1
    // 2 player2

    // Game Status
    // 0 open
    // 1 finished by win
    // 2 finished by draw

    // Play
    // 0 OK
    // 1 Invalid move
    // 2 Finished game

    constructor(tableLength) {
        this.tableLength = parseInt(tableLength);
        this.table = [];
        this.currentPlayer = 1;
        this.gameStatus = 0;
        this.playsCount = this.tableLength * this.tableLength;
        this.winnerPositions = [];

        // Initialize the table
        for (let i = 0; i < this.tableLength; i++) {
            let arrInside = [];
            for (let j = 0; j < this.tableLength; j++) {
                arrInside.push(0);
            }
            this.table.push(arrInside);
        }
    }

    play(i, j) {
        i = parseInt(i);
        j = parseInt(j);

        if (this.gameStatus > 0) {
            return 2;
        }

        if (this.isValidMove(i, j)) {
            this.table[i][j] = this.currentPlayer;
            this.playsCount--;
            if (this.checkWinner(i, j)) {
                this.gameStatus = 1;
            } else if (this.playsCount === 0) {
                this.gameStatus = 2;
            } else {
                this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
            }
        } else {
            return 1;
        }
    }

    isValidMove(i, j) {
        i = parseInt(i);
        j = parseInt(j);

        return i < this.table.length && j < this.table[i].length && this.table[i][j] === 0;
    }

    checkWinner(i, j) {
        i = parseInt(i);
        j = parseInt(j);

        // fila
        let winnerPositions = [];
        for (let c = 0; c < this.tableLength; c++) {
            if (this.table[i][c] === this.currentPlayer) {
                winnerPositions.push([i, c]);

                if (c === this.tableLength - 1) {
                    this.winnerPositions = winnerPositions;
                    return true;
                }
            } else {
                break;
            }
        }

        // columna
        winnerPositions = [];
        for (let r = 0; r < this.tableLength; r++) {
            if (this.table[r][j] === this.currentPlayer) {
                winnerPositions.push([r, j]);

                if (r === this.tableLength - 1) {
                    this.winnerPositions = winnerPositions;
                    return true;
                }
            } else {
                break;
            }
        }

        // diagonales
        // diangonal1
        winnerPositions = [];
        if (i === j) { // jugador jugo en la diagonal descendiente
            for (let x = 0; x < this.tableLength; x++) {
                if (this.table[x][x] === this.currentPlayer) {
                    winnerPositions.push([x, x]);

                    if (x === this.tableLength - 1) {
                        this.winnerPositions = winnerPositions;
                        return true;
                    }
                } else {
                    break;
                }
            }
        }

        // diagonal2
        winnerPositions = [];
        if (i + j === this.tableLength - 1) { // el jugador jugo en la diagonal ascendente
            for (let x = 0; x < this.tableLength; x++) {
                if (this.table[x][this.tableLength - 1 - x] === this.currentPlayer) {
                    winnerPositions.push([x, this.tableLength - 1 - x]);

                    if (x === this.tableLength - 1) {
                        this.winnerPositions = winnerPositions;
                        return true;
                    }
                } else {
                    break;
                }
            }
        }

        return false;
    }
}
