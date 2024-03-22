import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { DropOffGeneratorService } from '../shared/drop-off-generator.service';
import { ChickenData } from '../shared/chicken-data';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  timer: any;
  ShackleDataArray: ChickenData[] = [];
  dataArray: ChickenData[] = [];

  currentShackleData: ChickenData = {
    weight: 0,
    grade: 0,
    dropOff: 0,
    shackleId: 0,
  };

  /* for charts */
  improperWeightChickens = 0;
  properWeightChickens = 0;
  gradesCount = new Array(7).fill(0);
  chickensInEachLineCount = new Array(17).fill(0);
  dataSet: { name: string; value: number }[] = [];
  gradesDataSet: { name: string; value: number }[] = [];
  weightsDataSet: { name: string; value: number }[] = [];
  position = LegendPosition.Below;

  constructor(
    private dataSvc: DataService,
    private dropGenSvc: DropOffGeneratorService
  ) {}

  ngOnInit() {
    this.timer = setInterval(() => {
      this.getGradeData();
      this.getWeightData();
    }, 250);
    /* Data formation for weight, grade and dropoff lines */
    this.chickensInEachLineCount.forEach((count, idx) => {
      if (idx !== 0 && idx !== 4 && idx !== 9 && idx !== 10) {
        let dataObj = { name: `Line${idx}`, value: count };
        this.dataSet.push(dataObj);
      }
    });

    this.gradesCount.forEach((count, idx) => {
      if (idx !== 0) {
        this.gradesDataSet.push({
          name: `Grade ${String.fromCharCode(idx + 64)}`,
          value: this.gradesCount[idx],
        });
      }
    });

    this.weightsDataSet = [
      {
        name: 'Wt. b/w 1700 & 3300',
        value: this.properWeightChickens,
      },
      {
        name: 'Wt. < 1700 & > 3300',
        value: this.improperWeightChickens,
      },
    ];
  }

  computeSchakleData(id: number, parameter: string, value: number) {
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
      this.calculateMetrics(currentSchakleItem);
      this.currentShackleData = currentSchakleItem;
    } else {
      let shackleObj = { shackleId: id, [parameter]: value };
      this.dataArray.push(shackleObj);
    }
  }

  calculateMetrics(item: any) {
    if (item.weight < 1700 || item.weight > 3300) this.improperWeightChickens++;
    else this.properWeightChickens++;

    this.gradesCount[item.grade]++;
    this.chickensInEachLineCount[item.dropOff]++;
    this.setChartValues();
  }

  setChartValues() {
    this.dataSet.forEach((obj) => {
      let lineNo = +obj['name'].substring(4);
      obj['value'] = this.chickensInEachLineCount[lineNo];
    });
    this.dataSet = [...this.dataSet];

    this.gradesDataSet.forEach((obj, idx) => {
      obj['value'] = this.gradesCount[idx + 1];
    });
    this.gradesDataSet = [...this.gradesDataSet];

    this.weightsDataSet[0].value = this.properWeightChickens;
    this.weightsDataSet[1].value = this.improperWeightChickens;
    this.weightsDataSet = [...this.weightsDataSet];
  }

  getWeightData() {
    this.dataSvc.getData('ChickenWeightData').subscribe(
      (data) => {
        this.computeSchakleData(
          data[0].shackleId,
          'weight',
          data[0].weightInGram
        );
      },
      (error) => {
        /* error component */
      }
    );
  }

  getGradeData() {
    this.dataSvc.getData('ChickenGradeData').subscribe(
      (data) => {
        this.computeSchakleData(data[0].shackleId, 'grade', data[0].grade);
      },
      (error) => {
        /* error component */
      }
    );
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }
}
