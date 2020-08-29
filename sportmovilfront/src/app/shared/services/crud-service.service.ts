import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {
  private serverURL = 'http://localhost:1337/';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // ,
      // tslint:disable-next-line: quotemark
      // tslint:disable-next-line: object-literal-key-quotes
      // "Authorization":  `Bearer ${this.local}`
    })
  };
  constructor(private http: HttpClient) { }
  buildHeaders() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // ,
        // tslint:disable-next-line: quotemark
        // tslint:disable-next-line: object-literal-key-quotes
        // "Authorization": `Bearer ${this.local}`
      })
    };
  }
  public getModel(path): Observable<any> {
    this.buildHeaders();
    console.log(this.serverURL);
    return this.http.get<any>(`${this.serverURL}${path}`, this.httpOptions);
  }
}
