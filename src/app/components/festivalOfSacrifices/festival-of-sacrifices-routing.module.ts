import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FestivalOfSacrificesComponent } from './festivalOfSacrifices/festival-of-sacrifices.component';

const routes: Routes = [
  { path: '', component: FestivalOfSacrificesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FestivalOfSacrificesRoutingModule { }
