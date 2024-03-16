import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private dataSvc: DataService) {}
  timer: any;
  ShackleDataArray: { shackleId: number; weight?: number; grade?: number }[] =
    [];
  currentShackleData: { shackleId: number; weight?: number; grade?: number }[] =
    [];

  ngOnInit() {
    this.timer = setInterval(() => {
      this.dataSvc.getGradeData().subscribe(
        (data) => {
          this.combineData(data[0].shackleId, 'grade', data[0].grade);
        },
        (error) => {}
      );

      this.dataSvc.getWeightData().subscribe(
        (data) => {
          this.combineData(data[0].shackleId, 'weight', data[0].weightInGram);
        },
        (error) => {}
      );
    }, 100);
  }

  combineData(id: number, parameter: string, value: number) {
    const existingShackleIndex = this.ShackleDataArray.findIndex(
      (item) => item.shackleId === id
    );

    const existingShackleItem = this.ShackleDataArray[existingShackleIndex];

    if (existingShackleItem) {
      const shackleItem = {
        ...existingShackleItem,
        [parameter]: value,
      };
      this.currentShackleData[0] = shackleItem;
      this.ShackleDataArray[existingShackleIndex] = shackleItem;

      console.log(this.currentShackleData[0]);
    } else {
      let shackleObj = { shackleId: id, [parameter]: value };
      this.ShackleDataArray.push(shackleObj);
    }
  }

  ngOnDestroy() {
    this.timer.clearInterval();
  }
}
