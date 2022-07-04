import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs/internal/Subscription';
import { Employee } from 'src/app/core/models/employee.model';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { GlobalVariable } from 'src/app/shared/classes/globalVariable';
import { fadeIn, leftSlideEffect, rightSlideEffect } from 'src/app/shared/common-animations/common-animations';
import { CommonFunctions } from 'src/app/shared/common-functions/commonFunctions';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

const NUMVALIDATION: Validators = [Validators.required];

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css'],
  animations: [fadeIn, leftSlideEffect, rightSlideEffect]
})
export class ViewEmployeeComponent implements OnInit, OnDestroy {

  // From Group
  employeeForm: FormGroup = new FormGroup({
    name: new FormControl(null, NUMVALIDATION),
    salary: new FormControl(null, NUMVALIDATION),
    age: new FormControl(null, NUMVALIDATION)
  });

  // Declairation-Initialization
  employeeIdFromURL: string | null = '';
  employeeData: Employee = new Employee();

  // Subscription
  employeeDataSubscription: Subscription = new Subscription();

  // Instantiate
  constructor(
    public globalVariable: GlobalVariable,
    public commonFunctions: CommonFunctions,
    private dialog: MatDialog,
    private router: Router,
    private _employee: EmployeeService,
    private notificationService: NotificationService,
    private logger: NGXLogger,
    private route: ActivatedRoute,
  ) {
    this.checkIsNewViewEditDelete();
    this.getUrlEmployeeID();
  }

  // Getting Employee Id from URL
  private getUrlEmployeeID(): void {
    if (this.globalVariable.newViewEditDeleteApplication == 0)
      return;
    this.employeeDataSubscription.add(this.route.paramMap.subscribe(params => this.employeeIdFromURL = params.get('id')));
  }

  // To check action - New, View, Edit
  // new - 0, view - 1, edit -2 
  private checkIsNewViewEditDelete(): void {
    if (this.router.url.match('/dashboard/new-employee')) this.globalVariable.newViewEditDeleteApplication = 0;
    else if (this.router.url.match('/dashboard/view-employee/')) this.globalVariable.newViewEditDeleteApplication = 1;
    else if (this.router.url.match('/dashboard/edit-employee/')) this.globalVariable.newViewEditDeleteApplication = 2;
    else this.globalVariable.newViewEditDeleteApplication;
  }

  ngOnInit(): void {
    this.logger.log('Employee Detail Page loaded');

    this.isViewNewEditEmployee(this.globalVariable.newViewEditDeleteApplication);
  }

  ngOnDestroy(): void {
    this.employeeDataSubscription.unsubscribe();
    this.resetEmpoyeeDetailData();
  }

  onSubmitClick(): void {
    if (this.employeeForm.invalid) {
      this.notificationService.openNotificationSnackBar('Kindly enter currect inputs', 'Close');
      return;
    }
    const dialog = this.dialog.open(ConfirmDialogComponent, { data: { message: this.globalVariable.newViewEditDeleteApplication == 0 ? 'Do you want to Save this employee?' : 'Do you want to Update this employee?' }, });
    this.employeeDataSubscription.add(dialog.afterClosed().subscribe(result => {
      if (!result) return;


      if (this.globalVariable.newViewEditDeleteApplication == 0)
        this._employee.postEmployeeById(this.employeeForm.value);
      else if (this.globalVariable.newViewEditDeleteApplication == 2)
        this._employee.updateEmployeeById(this.employeeForm.value, this.employeeData.id);

      this.employeeDataSubscription.add(this._employee.employeeNewData$.subscribe(data => {
        if (data.data != undefined) {
          const employee = new Employee();
          employee.employee_name = data.data.name;
          employee.employee_salary = data.data.salary;
          employee.employee_age = data.data.age;
          this.setEmployeeFormData(employee);
        }
      }));

    }));
  }

  // Checking is it View/New/Edit-Employee
  // new - 0, view - 1, edit -2 
  private isViewNewEditEmployee(value: number): void {
    switch (value) {
      case 0:
        this.newEmployee();
        break;
      case 1:
        this.getEmployeeByIdApi();
        break;
      case 2:
        this.getEmployeeByIdApi();
        break;

      default:
        break;
    }
  }

  // If its new Employee
  // For new application kepp forms blank
  private newEmployee() { }

  // If its View or Edit Employee
  // Calling Employee by Id API
  private getEmployeeByIdApi(): void {
    this._employee.getEmployeeById(this.employeeIdFromURL);
    this.employeeDataSubscription.add(this._employee.employeeByIdData$.subscribe(data => {
      if (data.data != undefined) {
        this.employeeData = data.data;
        this.setEmployeeFormData(data.data);
      }
    }));
  }

  // Indian Currency Formeter
  getLocalVal(amount: number): string {
    if (amount == undefined) return amount;
    else return `${amount.toLocaleString('en-US')}`
  };

  // To reset Empoyee Detail Data
  private resetEmpoyeeDetailData(): void {
    this.employeeIdFromURL = '';
    this.employeeForm.reset();
    this.employeeData = new Employee();
  }

  // Setting Employee FormData
  private setEmployeeFormData(data: Employee): void {
    this.employeeForm.patchValue(
      {
        name: data.employee_name,
        salary: data.employee_salary,
        age: data.employee_age
      }
    );
  }

}
