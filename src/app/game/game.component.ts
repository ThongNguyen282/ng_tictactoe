import { Component, OnInit } from '@angular/core';
import { Gamelogic } from '../gamelogic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic],
})
export class GameComponent implements OnInit {
  constructor(public game: Gamelogic) {}
  ngOnInit(): void {}
  startGame(): void {
    this.game.gameStart();
    const currentPlayer = 'Current turn : Player: ' + this.game.currentTurn;
    const information = document.querySelector('.current-status');
    // console.log(information);
    // console.log(currentPlayer);

    if (information !== null) {
      // Kiểm tra xem information có phải là null hay không
      information.innerHTML = currentPlayer;
    } else {
      console.error('Element with class "current-status" not found.');
    }
  }

  async clickSubfield(subfield: any): Promise<void> {
    if (this.game.gameStatus === 1) {
      const position = subfield.currentTarget.getAttribute('position');
      const information = document.querySelector('.current-status');

      // console.log(position);
      this.game.setField(position, this.game.currentTurn);
      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);

      // await this.game.checkGameEndWinner();

      await this.game.checkGameEndWinner().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end) {
          if (information !== null) {
            // Kiểm tra xem information có phải là null hay không
            information.innerHTML =
              'The winner is player nr.' + this.game.currentTurn;
          } else {
            console.error('Element with class "current-status" not found.');
          }
        }
      });

      await this.game.checkGameEndFull().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end) {
          if (information !== null) {
            // Kiểm tra xem information có phải là null hay không
            information.innerHTML = 'NO winner, draw';
          } else {
            console.error('Element with class "current-status" not found.');
          }
        }
      });

      this.game.changePlayer();

      if (this.game.gameStatus === 1) {
        const currentPlayer = 'Current turn :player: ' + this.game.currentTurn;
        const information = document.querySelector('.current-status');
        if (information !== null) {
          // Kiểm tra xem information có phải là null hay không
          information.innerHTML = currentPlayer;
        } else {
          console.error('Element with class "current-status" not found.');
        }
      }
    }
  }
}
