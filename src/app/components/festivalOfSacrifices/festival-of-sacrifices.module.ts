import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FestivalOfSacrificesRoutingModule } from './festival-of-sacrifices-routing.module';
import { FestivalOfSacrificesComponent } from './festivalOfSacrifices/festival-of-sacrifices.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FestivalOfSacrificesComponent],
  imports: [CommonModule, FestivalOfSacrificesRoutingModule, FormsModule, ReactiveFormsModule, NgbModule],
})
export class FestivalOfSacrificesModule {}
