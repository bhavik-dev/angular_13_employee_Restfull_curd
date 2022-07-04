import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { ViewEmployeeRoutingModule } from './view-employee-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ViewEmployeeComponent
  ],
  imports: [
    CommonModule,
    ViewEmployeeRoutingModule,
    SharedModule
  ]
})
export class ViewEmployeeModule { }
