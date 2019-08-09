import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContourOutputComponent } from './contour-output/contour-output.component';

const routes: Routes = [{ path: '', component: ContourOutputComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContourOutputRoutingModule {}
