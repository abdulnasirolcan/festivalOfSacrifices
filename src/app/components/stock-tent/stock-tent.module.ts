import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockTentRoutingModule } from './stock-tent-routing.module';
import { StockTentComponent } from './stock-tent/stock-tent.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StockTentComponent],
  imports: [CommonModule, StockTentRoutingModule, FormsModule, ReactiveFormsModule, NgbModule.forRoot()],
})
export class StockTentModule {}
