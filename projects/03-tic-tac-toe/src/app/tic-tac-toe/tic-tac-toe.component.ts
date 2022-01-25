import { Component, OnInit } from '@angular/core';
import { TicTacToeService } from '../shared';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {

  constructor(private ticTacToeService: TicTacToeService) { }

  ngOnInit() {
    this.ticTacToeService.initialize();
  }

  /**
   * Returns whether the splash screen should be displayed.
   * 
   * @return boolean
   */
  get showStart(): boolean {
    return this.ticTacToeService.showStart;
  }

  /**
   * Returns whether the board should be displayed.
   * 
   * @return boolean
   */
  get showBoard(): boolean {
    return this.ticTacToeService.showBoard;
  }

  /**
   * Returns whether the end-game screen should be displayed.
   * 
   * @return boolean
   */
  get showEnd(): boolean {
    return this.ticTacToeService.showEnd;
  }

  /**
   * Initializes the data of a new game.
   *
   * @return void
   */
  initializeGame(): void {
    this.ticTacToeService.initializeGame();
  }

  /**
   * Make a move by clicking a location on the board.
   *
   * @param number posX
   * @param number posY
   * @return void
   */
  play(posX: number, posY: number): void {
    this.ticTacToeService.play(posX, posY);
  }

  /**
   * Returns whether part X should be displayed for the given coordinate.
   *
   * @param number posX
   * @param number posY
   * @return boolean
   */
  showX(posX: number, posY: number): boolean {
    return this.ticTacToeService.showX(posX, posY);
  }

  /**
   * Returns whether part O should be displayed for the given coordinate.
   *
   * @param number posX
   * @param number posY
   * @return boolean
   */
  showO(posX: number, posY: number): boolean {
    return this.ticTacToeService.showO(posX, posY);
  }

  /**
   * Returns whether the victory mark should be displayed for the given coordinate.
   *
   * @param number posX
   * @param number posY
   * @return boolean
   */
  showVictory(posX: number, posY: number): boolean {
    return this.ticTacToeService.showVictory(posX, posY);
  }

  /**
   * Returns the player number to play.
   * 
   * @return number
   */
  get player(): number {
    return this.ticTacToeService.player;
  }

  /**
   * Inicia um novo jogo.
   * 
   * @return void
   */
  newGame(): void {
    this.ticTacToeService.newGame();
  }


}
