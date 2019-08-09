import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContourOutputRoutingModule } from './contour-output-routing.module';
import { ContourOutputComponent } from './contour-output/contour-output.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContourOutputComponent],
  imports: [CommonModule, ContourOutputRoutingModule, FormsModule, ReactiveFormsModule, NgbModule.forRoot()],
})
export class ContourOutputModule {}
