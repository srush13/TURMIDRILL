import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginAuthService } from './services/login-auth.service';
import { GeneralService } from './services/general.service';
import { EMPTY, observable } from 'rxjs';
import { throwError, Observable, BehaviorSubject, of, pipe } from "rxjs";
import { catchError, tap, take } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  token: any;
  constructor(
    private login: LoginAuthService,
    private general: GeneralService,
    private router: Router
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // console.log("tok==",this.login.getLoginDetails())
    this.token = this.general.getToken()
    request = this.addAuthenticationToken(request)

    return next.handle(request).pipe(
      (take(1),
        catchError((error: any) => {
          console.log("erooorr=", error)
          if (error.status === 403 || error.status === 401) {
           this.login.logout()
          }
          return throwError(error);
        })), tap((res: any) => {
          if (res instanceof HttpResponse) {
            if (res.body.hasOwnProperty('data')) {
              res.body.data = this.general.decrypt(res.body.data);
            }
          }
          return res;
        })
    ) as any;
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    this.token = this.general.getToken();

    if (this.token && this.token != null) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.token}` },
      });
      if (request instanceof HttpRequest) {
        let authHeaders = request.headers.get('authorization');
        if (authHeaders) {
          let body = request.body;
          if (body) {
            request.body.data = this.general.encrypt(body.data);
          }
        } else {
          return request;
        }
      }
      return request;
    } else {
      return request;
    }
  }
}
