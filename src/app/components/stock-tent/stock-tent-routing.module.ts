import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockTentComponent } from './stock-tent/stock-tent.component';

const routes: Routes = [{ path: '', component: StockTentComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockTentRoutingModule {}
