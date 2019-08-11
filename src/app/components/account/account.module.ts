import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../../ui/pipe/pipe.module';
@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule, AccountRoutingModule, FormsModule, ReactiveFormsModule, NgbModule, PipeModule],
})
export class AccountModule {}
