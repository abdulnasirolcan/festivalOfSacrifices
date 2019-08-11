import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderBy } from './order-by.pipe';

@NgModule({
  declarations: [OrderBy],
  imports: [CommonModule],
  exports: [OrderBy],
})
export class PipeModule {}
