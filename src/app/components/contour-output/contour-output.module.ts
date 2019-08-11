import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContourOutputRoutingModule } from './contour-output-routing.module';
import { ContourOutputComponent } from './contour-output/contour-output.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../../ui/pipe/pipe.module';

@NgModule({
  declarations: [ContourOutputComponent],
  imports: [CommonModule, ContourOutputRoutingModule, FormsModule, ReactiveFormsModule, NgbModule, PipeModule],
})
export class ContourOutputModule {}
