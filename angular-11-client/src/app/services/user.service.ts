import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl + '/user');
  }

  get(mail: any): Observable<User> {
    return this.http.get(baseUrl + '/user/' + mail);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl + '/user/add', data);
  }

  login(data: any): Observable<any> {
      return this.http.post(baseUrl + '/user/login', data);
    }

  update(mail: any, data: any): Observable<any> {
    return this.http.put(baseUrl + '/user/add/' + mail, data);
  }

  resetVoting(hasVoted: any): Observable<any> {
      return this.http.put(baseUrl + '/user/resetVoting/' + hasVoted, "mySessionId");
    }

  delete(mail: any): Observable<any> {
    return this.http.delete(baseUrl + '/user/' + mail);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl + '/user/resetAll/');
  }

  findByTitle(mail: any): Observable<any> {
    return this.http.get(baseUrl + '/user/' + mail);
  }
}
