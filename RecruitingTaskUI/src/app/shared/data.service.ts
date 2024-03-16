import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChickenData } from './chicken-data';
import { Observable, combineLatest, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getWeightData(): Observable<any> {
    // return this.http.get<ChickenData[]>('../assets/dummy-chicken-data.json');
    return this.http.get('https://localhost:5003/ChickenWeightData');
  }

  getGradeData(): Observable<any> {
    return this.http.get('https://localhost:5003/ChickenGradeData');
  }

  getChickenData() {
    // return combineLatest([this.getWeightData(), this.getGradeData()]);
  }
}
