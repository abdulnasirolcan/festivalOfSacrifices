import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CutterRoutingModule } from './cutter-routing.module';
import { CutterComponent } from './cutter/cutter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../../ui/pipe/pipe.module';

@NgModule({
  declarations: [CutterComponent],
  imports: [CommonModule, CutterRoutingModule, FormsModule, ReactiveFormsModule, NgbModule, PipeModule],
})
export class CutterModule {}
