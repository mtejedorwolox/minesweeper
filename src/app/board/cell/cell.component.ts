import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BoardService } from './../board.service';

@Component({
  selector: 'minesweeper-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.sass']
})
export class CellComponent implements OnInit, OnDestroy {
  @Input() row: number;
  @Input() column: number;
  @Output() revealEvent = new EventEmitter<{ row: number, column: number }>();
  messages: any[] = [];
  subscription: Subscription;

  value: number;
  mine: boolean;
  revealed: boolean;
  hiddenStatus: string;

  constructor(private boardService: BoardService) {
    this.subscription = this.boardService.subscriber().subscribe(message => {
      if (message.row === this.row && message.column === this.column) {
        this.hiddenStatus = message.hiddenStatus;
        this.mine = message.mine;
        this.revealed = message.revealed;
        this.value = message.value;
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  reveal() {
    this.boardService.reveal(this.row, this.column);
  }

  changeState() {
    this.boardService.changeState(this.row, this.column);
    return false;
  }
}
