import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { DropOffGeneratorService } from '../shared/drop-off-generator.service';
import { ChickenData } from '../shared/chicken-data';
import {
  AxisLabelComponent,
  LegendEntryComponent,
  LegendPosition,
  LegendType,
} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  dropOffLaneCountData: number[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  dataset = [
    { name: 'Line 1', value: this.dropOffLaneCountData[0] },
    { name: 'Line 2', value: this.dropOffLaneCountData[1] },
    { name: 'Line 3', value: this.dropOffLaneCountData[2] },
    { name: 'Line 5', value: this.dropOffLaneCountData[4] },
    { name: 'Line 6', value: this.dropOffLaneCountData[5] },
    { name: 'Line 7', value: this.dropOffLaneCountData[6] },
    { name: 'Line 8', value: this.dropOffLaneCountData[7] },
    { name: 'Line 12', value: this.dropOffLaneCountData[11] },
    { name: 'Line 13', value: this.dropOffLaneCountData[12] },
    { name: 'Line 14', value: this.dropOffLaneCountData[13] },
    { name: 'Line 15', value: this.dropOffLaneCountData[14] },
    { name: 'Line 16', value: this.dropOffLaneCountData[15] },
  ];

  position = LegendPosition.Below;
  customColors = [
    {
      name: 'Grade A',
      value: 'blue',
    },
    {
      name: 'Grade B',
      value: 'red',
    },
  ];
  series = [
    {
      name: 'Grade A',
      value: 20,
      label: '20%',
    },
    {
      name: 'Grade B',
      value: 70,
      label: '70%',
    },
    {
      name: 'Grade C',
      value: 10,
      label: '10%',
    },
    {
      name: 'Grade D',
      value: 20,
      label: '20%',
    },
    {
      name: 'Grade E',
      value: 70,
      label: '70%',
    },
    {
      name: 'Grade F',
      value: 10,
      label: '10%',
    },
  ];

  timer: any;
  ShackleDataArray: ChickenData[] = [];
  currentShackleData: ChickenData = {
    weight: 0,
    grade: 0,
    dropOff: 0,
    shackleId: 0,
  };

  constructor(
    private dataSvc: DataService,
    private dropGenSvc: DropOffGeneratorService
  ) {}

  ngOnInit() {
    this.timer = setInterval(() => {
      this.getGradeData();
      this.getWeightData();
    }, 250);
  }

  dataArray: ChickenData[] = [];
  computSchakleData(id: number, parameter: string, value: number) {
    const idx = this.dataArray.findIndex((data) => id === data.shackleId);
    if (idx > -1) {
      let currentSchakleItem = this.dataArray.splice(idx, 1)[0];
      currentSchakleItem = {
        ...currentSchakleItem,
        [parameter]: value,
      };
      currentSchakleItem.dropOff = this.dropGenSvc.calculateDropOff(
        currentSchakleItem.weight,
        currentSchakleItem.grade
      );

      this.dataset[currentSchakleItem.dropOff - 1].value =
        this.dropOffLaneCountData[currentSchakleItem.dropOff - 1] += 1;
      this.dataset = [...this.dataset];
      this.currentShackleData = currentSchakleItem;
    } else {
      let shackleObj = { shackleId: id, [parameter]: value };
      this.dataArray.push(shackleObj);
    }
  }

  getWeightData() {
    this.dataSvc.getData('ChickenWeightData').subscribe(
      (data) => {
        this.computSchakleData(
          data[0].shackleId,
          'weight',
          data[0].weightInGram
        );
      },
      (error) => {}
    );
  }

  getGradeData() {
    this.dataSvc.getData('ChickenGradeData').subscribe(
      (data) => {
        this.computSchakleData(data[0].shackleId, 'grade', data[0].grade);
      },
      (error) => {}
    );
  }

  pieChartLabel(series: any[], name: string): string {
    const item = series.filter((data) => data.name === name);
    if (item.length > 0) {
      return item[0].label;
    }
    return name;
  }

  ngOnDestroy() {
    this.timer.clearInterval();
  }
}
