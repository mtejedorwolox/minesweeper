import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private subject = new Subject<any>();
  hiddenStatus: string[] = ['hidden', 'flagged', 'marked'];
  cells: { row: number, column: number, value: number, hiddenStatus: string, mine: boolean , revealed: boolean}[];
  gameStates: string[] = ['win', 'lose', 'incomplete'];
  gameState: string;

  constructor() {
    this.gameState = 'incomplete';
    this.cells = [
      { row: 0, column: 0, hiddenStatus: 'hidden', mine: false, revealed: false, value: 1 },
      { row: 0, column: 1, hiddenStatus: 'hidden', mine: true, revealed: false, value: undefined},
      { row: 0, column: 2, hiddenStatus: 'hidden', mine: false, revealed: false, value: 2 },
      { row: 0, column: 3, hiddenStatus: 'hidden', mine: false, revealed: false, value: 1 },
      { row: 0, column: 4, hiddenStatus: 'hidden', mine: false, revealed: false, value: 0 },
      { row: 1, column: 0, hiddenStatus: 'hidden', mine: false, revealed: false, value: 1 },
      { row: 1, column: 1, hiddenStatus: 'hidden', mine: false, revealed: false, value: 2 },
      { row: 1, column: 2, hiddenStatus: 'hidden', mine: true, revealed: false, value: undefined },
      { row: 1, column: 3, hiddenStatus: 'hidden', mine: false, revealed: false, value: 2 },
      { row: 1, column: 4, hiddenStatus: 'hidden', mine: false, revealed: false, value: 1 },
      { row: 2, column: 0, hiddenStatus: 'hidden', mine: false, revealed: false, value: 0 },
      { row: 2, column: 1, hiddenStatus: 'hidden', mine: false, revealed: false, value: 1 },
      { row: 2, column: 2, hiddenStatus: 'hidden', mine: false, revealed: false, value: 3 },
      { row: 2, column: 3, hiddenStatus: 'hidden', mine: true, revealed: false, value: undefined },
      { row: 2, column: 4, hiddenStatus: 'hidden', mine: false, revealed: false, value: 3 },
      { row: 3, column: 0, hiddenStatus: 'hidden', mine: false, revealed: false, value: 0 },
      { row: 3, column: 1, hiddenStatus: 'hidden', mine: false, revealed: false, value: 1 },
      { row: 3, column: 2, hiddenStatus: 'hidden', mine: false, revealed: false, value: 3 },
      { row: 3, column: 3, hiddenStatus: 'hidden', mine: true, revealed: false, value: undefined },
      { row: 3, column: 4, hiddenStatus: 'hidden', mine: true, revealed: false, value: undefined },
      { row: 4, column: 0, hiddenStatus: 'hidden', mine: false, revealed: false, value: 0 },
      { row: 4, column: 1, hiddenStatus: 'hidden', mine: false, revealed: false, value: 1 },
      { row: 4, column: 2, hiddenStatus: 'hidden', mine: true, revealed: false, value: undefined },
      { row: 4, column: 3, hiddenStatus: 'hidden', mine: false, revealed: false, value: 3 },
      { row: 4, column: 4, hiddenStatus: 'hidden', mine: false, revealed: false, value: 2 }
    ];
  }

  private checkGameState() {
    if (this.gameState === 'incomplete') {
      if (this.cells.find(cell => { return cell.mine === true && cell.revealed === true; })) {
        this.cells.filter(cell => { return !cell.revealed; }).forEach(cell => {
          cell.revealed = true;
          this.subject.next(cell);
        });
        return 'lose';
      } else if (this.cells.filter(cell => { return cell.mine === false && cell.revealed === false; }).length === 0) {
        return 'win';
      }
    }
    return 'incomplete'; 
  }

  private getNeighbors(row: number, column: number) {
    return this.cells.filter(cell => {
      return cell.row >= (row-1) && cell.row <= (row+1) &&
             cell.column >= (column-1) && cell.column <= (column+1) &&
             !(cell.row === row && cell.column === column) &&
             !cell.revealed
    });
  }

  getCell(row: number, column: number) {
    return this.cells.find(cell => cell.row === row && cell.column === column);
  }

  reveal(row: number, column: number) {
    let cell = this.getCell(row, column);
    cell.revealed = true;
    this.subject.next(cell);
    if (cell.value === this.flaggedNeighbors(row, column).length) {
      this.revealNeighbors(row, column);
    };
    this.gameState = this.checkGameState();
    console.log(this.gameState);
  };

  flaggedNeighbors(row: number, column: number) {
    return this.getNeighbors(row, column).filter(cell => {
      return cell.hiddenStatus === 'flagged';
    });
  };

  revealNeighbors(row: number, column: number) {
    this.getNeighbors(row, column).filter(cell => {
      return cell.revealed === false && cell.hiddenStatus !== 'flagged';
    }).forEach(cell => {
      this.reveal(cell.row, cell.column);
    });
  };

  changeState(row: number, column: number) {
    let cell = this.getCell(row, column);
    let index = this.hiddenStatus.findIndex(status => status === cell.hiddenStatus);
    cell.hiddenStatus = this.hiddenStatus[index + 1] || this.hiddenStatus[0];
    this.subject.next(cell)
  };

  subscriber(): Observable<any> {
    return this.subject.asObservable();
  };
}
