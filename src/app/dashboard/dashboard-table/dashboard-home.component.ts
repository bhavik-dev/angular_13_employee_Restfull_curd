import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { NGXLogger } from 'ngx-logger';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Employee } from 'src/app/core/models/employee.model';
import { MatTableDataSource } from '@angular/material/table';
import { fadeIn, leftSlideEffect, rightSlideEffect } from 'src/app/shared/common-animations/common-animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiResponce } from 'src/app/core/models/dummyApiResponce.model';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
  animations: [fadeIn, leftSlideEffect, rightSlideEffect]
})
export class DashboardHomeComponent implements OnInit, OnDestroy {

  // Declairation-Initialization
  employeeList: Array<Employee> = [];

  // Subscription
  dashboardSubscription: Subscription = new Subscription();

  // Employee Mat-Table DataSource & Column
  employeeDataSource: MatTableDataSource<Employee> = new MatTableDataSource<Employee>([]);
  displayedColumns: Array<string> = ['slno', 'employee_name', 'id', 'employee_age', 'employee_salary', 'details_page', 'action'];

  // ViewChilds
  @ViewChild('paginatorTableOne') paginatorTableOne!: MatPaginator;
  @ViewChild('sortTableOne') sortTableOne: MatSort = new MatSort();

  // Instantiate
  constructor(
    private notificationService: NotificationService,
    private logger: NGXLogger,
    private _employee: EmployeeService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.logger.log('Employee Dashboard loaded');

    this.getEmployeeeListAPI();
    this.welcomeMessage();
  }

  ngOnDestroy(): void {
    this.dashboardSubscription.unsubscribe();
    this.resetEmployeeTableData();
  }

  ngAfterViewInit(): void {
    this.employeeDataSource.paginator = this.paginatorTableOne;
    this.employeeDataSource.sort = this.sortTableOne;
  }

  // Employeee List API Request
  private getEmployeeeListAPI(): void {
    this._employee.getEmployeenData();
    this.dashboardSubscription.add(this._employee.employeeData$.subscribe(data => {
      if (data.data) {
        this.employeeList = data.data;
        this.setEmployeeTableData(this.employeeList);
        this._employee.employeeData$ = new BehaviorSubject({} as ApiResponce);
      }
    }));
  }

  // Indian Currency Formeter
  getLocalVal(amount: number): string {
    if (amount == undefined) return amount;
    else return `${amount.toLocaleString('en-US')}`
  };

  // On Delete Clink Action
  onDeleteClick(employee: Employee): void {
    const dialog = this.dialog.open(ConfirmDialogComponent, { data: { message: 'Do you want to Delete this Employee?' }, });
    this.dashboardSubscription.add(dialog.afterClosed().subscribe(result => {
      if (!result) return;
      this._employee.deleteEmployeeById(employee.id);
      this.dashboardSubscription.add(this._employee.employeeData$.subscribe(data => {
        if (data.data) {
          console.log(data.data)
          console.log('data.data')
          this.employeeList = this.employeeList.filter((obj) => obj.id != employee.id);
          this.setEmployeeTableData(this.employeeList);
          this.notificationService.openNotificationSnackBar('Employee ID ' + employee.id + ' have been Deleted', 'Close');
          this._employee.employeeData$ = new BehaviorSubject({} as ApiResponce);
        }
      }));
    }));
  }

  // All Filters
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.setEmployeeDataSourceFilter(filterValue);
  }

  // Setting Employee TableData
  private setEmployeeTableData(data: Employee[]): void {
    this.employeeDataSource = new MatTableDataSource<Employee>(data || []);
    this.employeeDataSource.paginator = this.paginatorTableOne;
    this.employeeDataSource.sort = this.sortTableOne;
  }

  // Employee DataSource Filter
  private setEmployeeDataSourceFilter(filterValue: string): void {
    this.employeeDataSource.filter = filterValue.trim().toLowerCase();
    if (this.employeeDataSource.paginator) this.employeeDataSource.paginator.firstPage();
  }

  // Rendering Welcome Message
  private welcomeMessage = (): number => setTimeout(() => this.notificationService.openNotificationSnackBar('Welcome to Bhavik Application!', 'Close'));

  // Reset Employee Table Data
  private resetEmployeeTableData(): void {
    this.employeeList = [];
    this.employeeDataSource = new MatTableDataSource<Employee>([]);
  }

}
