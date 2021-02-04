import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from './../../environments/environment';

const baseUrl = environment.apiUrl + '/votes';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  vote(data: any): Observable<any> {
      return this.http.post(baseUrl + '/vote', data);
  }
}
