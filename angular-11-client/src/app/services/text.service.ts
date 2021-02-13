import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from './../../environments/environment';

const baseUrl = environment.apiUrl + '/texts';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  constructor(private http: HttpClient) { }

  init(data: any): Observable<any> {
      return this.http.get(baseUrl + '/init/' + data);
  }

  setTexts(data: any): Observable<any> {
        return this.http.post(baseUrl + '/setTexts', data);
    }
}
