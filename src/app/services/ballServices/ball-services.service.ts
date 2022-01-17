import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BallServicesService {

  public chosenNumbers :Subject<number[]> = new Subject();
  public numberBalls: number = 0;
  constructor() { }

}
