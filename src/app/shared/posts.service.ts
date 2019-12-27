import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post, User} from './interfaces';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
  constructor(private http: HttpClient) {}

  removeAdmin(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiKey}/admin/articles/delete/${id}`);
  }

  getForAdmin(): Observable<Post[]> {
    return this.http.get(`${environment.apiKey}/admin/articles`)
        .pipe(map( (response: Post[]) => response ));
  }

  approve(id: number) {
    return this.http.get(`${environment.apiKey}/admin/articles/approve/${id}`);
  }

  getUsersList(): Observable<User[]> {
    return this.http.get(`${environment.apiKey}/admin/users`)
      .pipe(map((response: User[]) => response));
  }

  removeUser(username: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiKey}/admin/users/delete/${username}`);
  }
}
