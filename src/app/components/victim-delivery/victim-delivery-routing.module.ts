import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VictimDeliveryComponent } from './victim delivery/victim-delivery.component';

const routes: Routes = [{ path: '', component: VictimDeliveryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VictimDeliveryRoutingModule {}
