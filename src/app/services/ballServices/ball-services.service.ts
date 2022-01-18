import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ballIndividual } from '../../interfaces/ball';

@Injectable({
  providedIn: 'root'
})
export class BallServicesService {

  public chosenNumbers :Subject<ballIndividual[]> = new Subject();
  public betNumbers :Subject<ballIndividual[]> = new Subject();
  public numberBalls: number = 0;
  public amountBet: number = 0;
  constructor() { }

}
