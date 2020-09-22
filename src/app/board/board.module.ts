import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardService } from './board.service';
import { BoardComponent } from './board/board.component';
import { RowComponent } from './row/row.component';
import { CellComponent } from './cell/cell.component';


@NgModule({
  declarations: [BoardComponent, RowComponent, CellComponent],
  exports: [
    BoardComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    BoardService
  ]
})
export class BoardModule { }
