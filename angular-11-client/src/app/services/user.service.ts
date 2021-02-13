import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from './../../environments/environment';

const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
      return this.http.post(baseUrl + '/user/login', data);
  }

  logout(data: any): Observable<any> {
        return this.http.post(baseUrl + '/user/logout', data);
    }

  getAll(data: any): Observable<User[]> {
    console.log(data);
    return this.http.put<User[]>(baseUrl + '/user', data);
  }

  get(data: any, mail: any): Observable<any> {
    return this.http.put(baseUrl + '/user/' + mail, data);
  }

  getHasVoted(data: any): Observable<any> {
      return this.http.put(baseUrl + '/getHasVoted', data);
    }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl + '/user/add', data);
  }

  updateList(data: any): Observable<any> {
      return this.http.post(baseUrl + '/user/updateList', data);
    }


  resetVoting(data: any, hasVoted: any): Observable<any> {
      return this.http.put(baseUrl + '/user/resetVoting/' + hasVoted, data);
    }

  delete(data: any, mail: any): Observable<any> {
    return this.http.delete(baseUrl + '/user/delete/' + mail);
  }

  deleteAll(data: any): Observable<any> {
    return this.http.delete(baseUrl + '/user/resetAll/', data);
  }

  getGrants(data: any): Observable<any> {
    return this.http.put(baseUrl + '/user/getGrants', data);
  }

}
