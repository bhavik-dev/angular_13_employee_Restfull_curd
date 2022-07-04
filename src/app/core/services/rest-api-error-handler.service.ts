import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ServerError } from 'src/app/shared/enums/server-error';

@Injectable()
export class RestApiErrorHandlerService {

  constructor() { }
  
  handleError(error: HttpErrorResponse, errorStatus: Subject<ServerError>): void {
    switch (error.status) {
      case 0:
        errorStatus.next(ServerError.UNKNOWN);
        break;
      case 400:
        errorStatus.next(ServerError.BAD_REQUEST);
        break;
      case 401:
        errorStatus.next(ServerError.UNAUTHORIZED);
        break;
      case 403:
        errorStatus.next(ServerError.TOKEN_EXPIRED);
        break;
      case 404:
        errorStatus.next(ServerError.NOT_FOUND);
        break;
      case 500:
        errorStatus.next(ServerError.INTERNAL_SERVER_ERROR);
        break;
      case 503:
        errorStatus.next(ServerError.SERVER_UNAVAILABLE);
        break;

      default: console.log(error.status)
        break;
    }
  }
}
