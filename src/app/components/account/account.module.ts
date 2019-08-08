import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReversePipe } from '../../ui/pipe';

@NgModule({
  declarations: [AccountComponent, ReversePipe],
  imports: [CommonModule, AccountRoutingModule, FormsModule, ReactiveFormsModule, NgbModule.forRoot()],
})
export class AccountModule {}
