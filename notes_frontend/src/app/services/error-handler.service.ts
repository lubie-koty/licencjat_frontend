import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements HttpInterceptor {

  constructor (private router: Router) { }

  intercept (req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(this.handleError(error)));
      }) 
    )
  }

  private handleError (error: HttpErrorResponse) : string {
    if (error.status === 404) {
      return this.handleNotFoundError(error);
    }
    if (error.status === 401) {
      return this.handleUnauthorized(error);
    }
    return this.handleBadRequest(error);
  }

  private handleNotFoundError (error: HttpErrorResponse) : string {
    this.router.navigate(['/'], { queryParams: { error: true } });
    return error.message;
  }

  private handleUnauthorized (error: HttpErrorResponse) : string {
    if (this.router.url === '/authenticate/login') {
      return 'Error. Entered wrong username or password.';
    }
    this.router.navigate(['/authenticate/login']);
    return error.message;
  }

  private handleBadRequest (error: HttpErrorResponse) : string {
    if (this.router.url === '/authenticate/login') {
      return error.error ? error.error : error.message;
    }
    let message = '';
    Object.values(error.error.errors).forEach(err => {
      message += `${err}<br>`;
    })
    return message;
  }
}
