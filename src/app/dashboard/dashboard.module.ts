import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DashboardHomeComponent } from './dashboard-table/dashboard-home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [DashboardHomeComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  entryComponents: []
})
export class DashboardModule { }
