import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {AuthService} from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // public error$: Subject<any> = new Subject<any>();
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const headersConfig = {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      };

      const token = this.auth.token;

      if (token) {
          headersConfig['Authorization'] = `${token}`;
      }

      const request = req.clone({ setHeaders: headersConfig });
      return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                  this.auth.logout();
                  this.router.navigate(['/'], {
                      queryParams: {
                          authFailed: true
                      }
                  });
                  return throwError(error);
              }
              else if (error.status === 400) {
                this.auth.error$.next('Неверный логин или пароль');
                throwError(error);
              }
          })
      );
  }
}
