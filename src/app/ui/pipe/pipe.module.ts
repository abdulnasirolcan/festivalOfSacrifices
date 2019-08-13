import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderBy } from './order-by.pipe';
import { SearchFilterPipe } from './filter-pipe';
import { LetterBoldPipe } from './letter-bold.pipe';

@NgModule({
  declarations: [OrderBy, SearchFilterPipe, LetterBoldPipe],
  imports: [CommonModule],
  exports: [OrderBy, SearchFilterPipe, LetterBoldPipe],
})
export class PipeModule {}
