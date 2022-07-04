import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MediaMatcher } from '@angular/cdk/layout';
import { NGXLogger } from 'ngx-logger';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { GlobalErrorHandler } from './services/globar-error.handler'; 
import { EmployeeService } from './services/employee.service';
import { ApiHttpService } from './services/api-http.service';
import { Constants } from './config/constants';
import { RestApiErrorHandlerService } from './services/rest-api-error-handler.service';
;

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
  ],
  providers: [
    MediaMatcher,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    { provide: NGXLogger, useClass: NGXLogger },
    { provide: 'LOCALSTORAGE', useValue: window.localStorage },
    EmployeeService,
    Constants,
    ApiHttpService,
    RestApiErrorHandlerService,
  ],
  exports: [
  ]
})
export class CoreModule {
}
