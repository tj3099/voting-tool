import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const baseUrl = 'http://localhost:8080/api/questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  add(data: any): Observable<any> {
      return this.http.post(baseUrl + '/add', data);
  }

  close(data: any): Observable<any> {
     return this.http.put(baseUrl + '/close', data);
  }

  open(data: any): Observable<any> {
       return this.http.put(baseUrl + '/open', data);
  }

  getAll(): Observable<any>{
      return this.http.get(baseUrl + '/all');
  }

  getOpen(): Observable<any>{
        return this.http.get(baseUrl + '/all/true');
    }
}
