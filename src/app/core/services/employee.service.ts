import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Subject } from 'rxjs/internal/Subject';
import { ServerError } from 'src/app/shared/enums/server-error';
import { ApiResponce } from '../models/dummyApiResponce.model';
import { SingleApiResponce } from '../models/dummyApiResponceSingle.model';
import { SingleNewApiResponce } from '../models/dummyNewApiResponceSingle.model';
import { ApiHttpService } from './api-http.service';
import { NotificationService } from './notification.service';
import { RestApiErrorHandlerService } from './rest-api-error-handler.service';

@Injectable()
export class EmployeeService {

  // BehaviorSubjects
  employeeData$: BehaviorSubject<ApiResponce> = new BehaviorSubject<ApiResponce>({} as ApiResponce);
  employeeByIdData$: BehaviorSubject<SingleApiResponce> = new BehaviorSubject<SingleApiResponce>({} as SingleApiResponce);
  employeeNewData$: BehaviorSubject<SingleNewApiResponce> = new BehaviorSubject<SingleNewApiResponce>({} as SingleNewApiResponce);

  // Subjects
  errorStatus$: Subject<ServerError> = new Subject<ServerError>();

  constructor(
    private notificationService: NotificationService,
    private _apiHttpService: ApiHttpService,
    private _restApiErrorHandler: RestApiErrorHandlerService
  ) { }


  // To get List of Employee
  getEmployeenData(): void {
    this._apiHttpService.get(this.getEndPoint('V'), { observe: 'response' })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const msg = `${err.status} ${err.statusText} -  ${err.url}`
          console.error('An error occurred:', err.error, msg);
          this._restApiErrorHandler.handleError(err, this.errorStatus$);
          return throwError(() => err);
        }))
      .subscribe({
        next: (response: any) => this.handleHttpResponse(response, 'employee-list'),
        error: (error: any) => {
          console.error("Error Logged From Subscrition", error);
          this.notificationService.openNotificationSnackBar(error.message, 'Close');
        },
        complete: () => console.log("From Subscription Complete()"),
      });
  }

  // To get Employee by Id
  getEmployeeById(id: string | null): void {
    this._apiHttpService.get(this.getEndPoint('V1', id), { observe: 'response' })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const msg = `${err.status} ${err.statusText} -  ${err.url}`
          console.error('An error occurred:', err.error, msg);
          this._restApiErrorHandler.handleError(err, this.errorStatus$);
          return throwError(() => err);
        }))
      .subscribe({
        next: (response: any) => this.handleHttpResponse(response, 'employee'),
        error: (error: any) => {
          console.error("Error Logged From Subscrition", error);
          this.notificationService.openNotificationSnackBar(error.message, 'Close');
        },
        complete: () => console.log("From Subscription Complete()"),
      });
  }

  // Post Employee 
  postEmployeeById(data: FormData): void {
    this._apiHttpService.post(this.getEndPoint('C'), data, { observe: 'response' })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const msg = `${err.status} ${err.statusText} -  ${err.url}`
          console.error('An error occurred:', err.error, msg);
          this._restApiErrorHandler.handleError(err, this.errorStatus$);
          return throwError(() => err);
        }))
      .subscribe({
        next: (response: any) => this.handleHttpResponse(response, 'create'),
        error: (error: any) => {
          console.error("Error Logged From Subscrition", error);
          this.notificationService.openNotificationSnackBar(error.message, 'Close');
        },
        complete: () => console.log("From Subscription Complete()"),
      });
  }

  // Update Employee 
  updateEmployeeById(data: FormData, employeeId: number): void {
    this._apiHttpService.put(this.getEndPoint('U', employeeId), data, { observe: 'response' })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const msg = `${err.status} ${err.statusText} -  ${err.url}`
          console.error('An error occurred:', err.error, msg);
          this._restApiErrorHandler.handleError(err, this.errorStatus$);
          return throwError(() => err);
        }))
      .subscribe({
        next: (response: any) => this.handleHttpResponse(response, 'update'),
        error: (error: any) => {
          console.error("Error Logged From Subscrition", error);
          this.notificationService.openNotificationSnackBar(error.message, 'Close');
        },
        complete: () => console.log("From Subscription Complete()"),
      });
  }

  // Delete Employee by Id
  deleteEmployeeById(id: number): void {
    this._apiHttpService.delete(this.getEndPoint("D", id), { observe: 'response' })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const msg = `${err.status} ${err.statusText} -  ${err.url}`
          console.error('An error occurred:', err.error, msg);
          this._restApiErrorHandler.handleError(err, this.errorStatus$);
          return throwError(() => err);
        }))
      .subscribe({
        next: (response: any) => this.handleHttpResponse(response, 'delete'),
        error: (error: any) => {
          console.error("Error Logged From Subscrition", error);
          this.notificationService.openNotificationSnackBar(error.message, 'Close');
        },
        complete: () => console.log("From Subscription Complete()"),
      });
  }

  // Handle Http Response based on status code
  private handleHttpResponse(response: any, type: string) {
    switch (response.status) {
      case 200:
        this.employeeResponseType(response, type);
        this.errorStatus$.next(ServerError.NONE);
        break;
      case 201:
        this.errorStatus$.next(ServerError.CREATED);
        break;
      case 204:
        this.errorStatus$.next(ServerError.NO_DATA_FOUND);
        break;
      case 211:
        this.errorStatus$.next(ServerError.DUPLICATE);
        break;
      default:
        break;
    }
  }

  private employeeResponseType(response: any, type: string) {
    console.log('----------------Employee Responce-----------------');
    console.log(response.body);
    switch (type) {
      case 'employee-list':
        this.employeeData$.next(response.body);
        break;
      case 'employee':
        this.employeeByIdData$.next(response.body);
        break;
      case 'create':
        this.employeeNewData$.next(response.body);
        break;
      case 'update':
        this.employeeNewData$.next(response.body);
        break;
      case 'delete':
        this.employeeData$.next(response.body);
        break;

      default:
        break;
    }
  }


  // EndPoint method to return url link based on type of Request
  private getEndPoint(type: "C" | "U" | "V" | "D" | "V1", id?: any): string {
    switch (type) {
      case "C":
        let createpath = 'http://dummy.restapiexample.com/api/v1/create';
        return createpath;
      case "U":
        let updatepath = 'http://dummy.restapiexample.com/api/v1/update/' + id;
        return updatepath;
      case "D":
        let deletepath = 'http://dummy.restapiexample.com/api/v1/delete/' + id;
        return deletepath;
      case "V":
        let viewpath = 'http://dummy.restapiexample.com/api/v1/employees';
        return viewpath;
      case "V1":
        let viewsinglepath = 'http://dummy.restapiexample.com/api/v1/employee/' + id;
        return viewsinglepath;
      default:
        console.log("Invalid Case in get EndPoint");
        return ""
    }
  }
}
