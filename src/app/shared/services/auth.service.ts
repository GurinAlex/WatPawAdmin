import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {catchError, distinctUntilChanged, map, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {User} from '../interfaces';

@Injectable({providedIn: 'root'})
export class AuthService {

  public error$: Subject<any> = new Subject<any>();

  constructor(private http: HttpClient) {}

  setAuth(user: User) {
    if (user.token) {
      this.saveToken(user.token);
    }
  }

  saveToken(token: string): void {
    localStorage.setItem('test_token', token);
  }

  get token(): string {
    return localStorage.getItem('test_token');
  }

  login(user: User): Observable<any> {
    return this.http.post(`${environment.apiKey}/users/login`, user)
        .pipe(
            map((userData: User) => {
              this.setAuth(userData);
            }),
            catchError((error: HttpErrorResponse) => {
              if (error.status === 400) {
                console.log(error.status)
                return throwError(error);
              }
            })
        );
  }
  // this.handleError.bind(this)
  logout() {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }


  private handleError(error: HttpErrorResponse) {
    // const status = error.status;

    console.log(error);
    // switch (message) {
    //   case 'fail':
    //     this.error$.next('Неверный email')
    //     break;
      // case 'INVALID_PASSWORD':
      //   this.error$.next('Неверный пароль')
      //   break
      // case 'EMAIL_NOT_FOUND':
      //   this.error$.next('Такого email нет')
      //   break
    // }
    return throwError(error);
  }
}
