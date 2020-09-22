import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'minesweeper-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.sass']
})
export class RowComponent implements OnInit {
  @Input() row: number;
  @Input() columns: number;
  @Output() revealEvent = new EventEmitter<{ row: number, column: number }>();
  Arr = Array;

  constructor() { }

  ngOnInit(): void {
  }

  reveal(args): void {
    console.log('row reveal');
    this.revealEvent.emit(args);
  }

}
