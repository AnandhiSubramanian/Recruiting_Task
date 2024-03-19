import { Injectable } from '@angular/core';
import dropLineCriteria from './drop-off-line-criteria.json';

@Injectable({
  providedIn: 'root',
})
export class DropOffGeneratorService {
  min: number = -1;
  droppedCount: number = 0;
  dropLineCriteria: any;
  specialLine: number = 6;
  alternateLine: number = 7;
  allowedNoOfChickens: number = 5;

  constructor() {
    this.dropLineCriteria = dropLineCriteria.dropOffLines;
  }

  checkTrafficInLine6(): number {
    let currentMin = new Date().getMinutes();
    if (this.min !== currentMin) {
      this.min = currentMin;
      this.droppedCount = 1;
      return this.specialLine;
    } else {
      this.droppedCount++;
      return this.droppedCount > this.allowedNoOfChickens
        ? this.alternateLine
        : this.specialLine;
    }
  }

  calculateDropOff(weight: number = 0, grade: number = 0) {
    let gradeRange = this.findGradeRange(grade);
    let dropOffId = 0;
    for (let i = 0; i < gradeRange.length; i++) {
      if (
        weight >= gradeRange[i].rangeStart &&
        weight <= gradeRange[i].rangeEnd
      ) {
        dropOffId = gradeRange[i].dropOffLine;
        break;
      }
    }
    return dropOffId;
  }

  findGradeRange(grade: number) {
    switch (grade) {
      case 1:
        return this.dropLineCriteria.gradeA;
      case 2:
        return this.dropLineCriteria.gradeB;
      case 3:
        return this.dropLineCriteria.gradeC;
      default:
        return this.dropLineCriteria.gradeX;
    }
  }
}
