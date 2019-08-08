import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CutterComponent } from './cutter/cutter.component';

const routes: Routes = [
  { path: '', component: CutterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CutterRoutingModule { }
