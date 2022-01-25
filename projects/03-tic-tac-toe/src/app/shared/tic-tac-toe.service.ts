import { Injectable } from '@angular/core';

@Injectable()
export class TicTacToeService {

  private readonly BOARD_SIZE: number = 3;
  private readonly X: number = 1;
  private readonly O: number = 2;
  private readonly EMPTY: number = 0;

  private board: any;
  private movAmount: number;
  private victory: any;

  private _player: number;
  private _showStart: boolean;
  private _showBoard: boolean;
  private _showEnd: boolean;

  constructor() { }

  /**
   * Starts the game. Sets home screen display.
   *
   * @return void
   */
  initialize(): void {
    this._showStart = true;
    this._showBoard = false;
    this._showEnd = false;
    this.movAmount = 0;
    this._player = this.X;
    this.victory = false;
    this.initializeBoard();
  }

  /**
   * Initialize the game board with empty for all positions.
   *
   * @return void
   */
  initializeBoard(): void {
    this.board = [this.BOARD_SIZE];
    for (let i = 0; i < this.BOARD_SIZE; i++) {
      this.board[i] = [this.EMPTY, this.EMPTY, this.EMPTY];
    }
  }

  /**
   * Returns whether the splash screen should be displayed.
   * 
   * @return boolean
   */
  get showStart(): boolean {
    return this._showStart;
  }

  /**
   * Returns whether the board should be displayed.
   * 
   * @return boolean
   */
  get showBoard(): boolean {
    return this._showBoard;
  }

  /**
   * Returns whether the game end screen should be displayed.
   * 
   * @return boolean
   */
  get showEnd(): boolean {
    return this._showEnd;
  }

  /**
   * Returns the player number to play.
   * 
   * @return number
   */
  get player(): number {
    return this._player;
  }

  /**
   * Show board.
   *
   * @return void
   */
  initializeGame(): void {
    this._showStart = false;
    this._showBoard = true;
  }

  /**
   * Make a play given the coordinates of the board.
   *
   * @param number posX
   * @param number posY
   * @return void
   */
  play(posX: number, posY: number): void {
    // invalid play
    if (this.board[posX][posY] !== this.EMPTY ||
      this.victory) {
      return;
    }

    this.board[posX][posY] = this._player;
    this.movAmount++;
    this.victory = this.endGame(posX, posY,
      this.board, this._player);
    this._player = (this._player === this.X) ? this.O : this.X;

    if (!this.victory && this.movAmount < 9) {
      this.cpuPlay();
    }

    // there's victory
    if (this.victory !== false) {
      this._showEnd = true;
    }

    // a tie
    if (!this.victory && this.movAmount === 9) {
      this._player = 0;
      this._showEnd = true;
    }
  }

  /**
   * Checks and returns if the game is over.
   *
   * @param number line
   * @param number column
   * @param any board
   * @param number player
   * @return array
   */
  endGame(line: number, column: number,
    board: any, player: number) {
    let end: any = false;

    // validate the line
    if (board[line][0] === player &&
      board[line][1] === player &&
      board[line][2] === player) {
      end = [[line, 0], [line, 1], [line, 2]];
    }

    // validate the column
    if (board[0][column] === player &&
      board[1][column] === player &&
      board[2][column] === player) {
      end = [[0, column], [1, column], [2, column]];
    }

    // validate the diagonals
    if (board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player) {
      end = [[0, 0], [1, 1], [2, 2]];
    }

    if (board[0][2] === player &&
      board[1][1] === player &&
      board[2][0] === player) {
      end = [[0, 2], [1, 1], [2, 0]];
    }

    return end;
  }

  /**
   * Logic to simulate computer play in random mode.
   *
   * @return void
   */
  cpuPlay(): void {
    // check win play
    let play: number[] = this.getPlay(this.O);

    if (play.length <= 0) {
      // try play to avoid defeat
      play = this.getPlay(this.X);
    }

    if (play.length <= 0) {
      // play random
      let plays: any = [];
      for (let i = 0; i < this.BOARD_SIZE; i++) {
        for (let j = 0; j < this.BOARD_SIZE; j++) {
          if (this.board[i][j] === this.EMPTY) {
            plays.push([i, j]);
          }
        }
      }
      let k = Math.floor((Math.random() * (plays.length - 1)));
      play = [plays[k][0], plays[k][1]];
    }

    this.board[play[0]][play[1]] = this._player;
    this.movAmount++;
    this.victory = this.endGame(play[0], play[1],
      this.board, this._player);
    this._player = (this._player === this.X) ? this.O : this.X;
  }

  /**
   * Get a valid play for a player to win.
   *
   * @param number player
   * @return number[]
   */
  getPlay(player: number): number[] {
    let tab = this.board;
    for (let lin = 0; lin < this.BOARD_SIZE; lin++) {
      for (let col = 0; col < this.BOARD_SIZE; col++) {
        if (tab[lin][col] !== this.EMPTY) {
          continue;
        }
        tab[lin][col] = player;
        if (this.endGame(lin, col, tab, player)) {
          return [lin, col];
        }
        tab[lin][col] = this.EMPTY;
      }
    }
    return [];
  }

  /**
   * Returns whether part X should be displayed for the given coordinate.
   *
   * @param number posX
   * @param number posY
   * @return boolean
   */
  showX(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.X;
  }

  /**
   * Returns whether part X should be displayed for the given coordinate.
   *
   * @param number posX
   * @param number posY
   * @return boolean
   */
  showO(posX: number, posY: number): boolean {
    return this.board[posX][posY] === this.O;
  }

  /**
   * Returns whether the victory mark should be displayed for the given coordinate.
   *
   * @param number posX
   * @param number posY
   * @return boolean
   */
  showVictory(posX: number, posY: number): boolean {
    let showVictory: boolean = false;

    if (!this.victory) {
      return showVictory;
    }

    for (let pos of this.victory) {
      if (pos[0] === posX && pos[1] === posY) {
        showVictory = true;
        break;
      }
    }

    return showVictory;
  }

  /**
   * Start a new game as well as display the board.
   *
   * @return void
   */
  newGame(): void {
    this.initialize();
    this._showEnd = false;
    this._showStart = false;
    this._showBoard = true;
  }

}