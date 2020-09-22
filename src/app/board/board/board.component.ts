import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'minesweeper-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {
  rows: number;
  columns: number;
  
  Arr = Array;

  constructor() {
    this.rows = 5;
    this.columns = 5;
  }

  ngOnInit(): void {
  }
}
