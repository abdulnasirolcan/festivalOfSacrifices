import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VictimDeliveryRoutingModule } from './victim-delivery-routing.module';
import { VictimDeliveryComponent } from './victim delivery/victim-delivery.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VictimDeliveryComponent],
  imports: [CommonModule, VictimDeliveryRoutingModule, FormsModule, ReactiveFormsModule, NgbModule.forRoot()],
})
export class VictimDeliveryModule {}
