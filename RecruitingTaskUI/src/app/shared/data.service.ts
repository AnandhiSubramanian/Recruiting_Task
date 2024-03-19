import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, combineLatest, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url: string = 'https://localhost:5003/';

  constructor(private http: HttpClient) {}

  getData(endPoint: string): Observable<any> {
    let url = this.url + endPoint;
    return this.http.get(url);
  }
}
