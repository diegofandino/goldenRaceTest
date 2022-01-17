import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BallServicesService } from '../../services/ballServices/ball-services.service';

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss']
})
export class BetSlipComponent implements OnInit {

  arrayNumberChosen: number[] = [];
  arrayNumberBalls: number[] = [];
  priceControl: number = 0;
  constructor(private ballService :BallServicesService ) { }

  ngOnInit(): void {
    
    //Number of balls
    this.arrayNumberBalls = Array.from(Array(this.ballService.numberBalls).keys())
    //Balls
    this.ballService.chosenNumbers.subscribe((value) => {
        this.arrayNumberChosen = value;
   });
  }

}
