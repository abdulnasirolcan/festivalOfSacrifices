import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PipeModule } from '../../ui/pipe/pipe.module';
import { ClickOutsideDirective } from 'src/app/ui/directive';

@NgModule({
  declarations: [DashboardComponent, ClickOutsideDirective],
  imports: [CommonModule, DashboardRoutingModule, FormsModule, ReactiveFormsModule, NgbModule, PipeModule],
})
export class DashboardModule {}
