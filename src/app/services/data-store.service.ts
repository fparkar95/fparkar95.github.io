import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Points } from '../models/colors';


@Injectable({
  providedIn: 'root',
})
export class DataStoreService {
  private score = new BehaviorSubject<number>(0);
  // We do not expose Subjects, because it's an anti-pattern, we only expose Observables
  public score$: Observable<number> = this.score;

  // We change data via methods
  setScore(value: number): void {
    this.score.next(value);
  }

  calculateScore(val: number, numOfTries: number){

      switch(numOfTries){
        case 1:
          val = val + Points.FIVE;
          break;
        case 2:
          val = val + Points.TWO;
          break;
        case 3:
          val = val + Points.ONE;
          break;
        default:
          break;
      }
      this.setScore(val);
      localStorage.setItem("score", val.toString());
  }

}
