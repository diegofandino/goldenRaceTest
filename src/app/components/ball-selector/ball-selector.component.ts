import { Component, OnInit } from '@angular/core';
import { BallServicesService } from 'src/app/services/ballServices/ball-services.service';

@Component({
  selector: 'app-ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss']
})
export class BallSelectorComponent implements OnInit {

  arrayNumbers: number[] = [];
  arrayNumbersChoose: number[] = [];
  constructor(private ballService : BallServicesService) { }

  ngOnInit(): void {
    this.loopArray(10);
    this.ballService.numberBalls = 10;
  }

  loopArray(numberBets: number){
    for (let i = 1; i <= numberBets; i++) {
        this.arrayNumbers.push(i);      
    }
  }

  chooseBall(index: number){

    let repeatNumber = this.arrayNumbersChoose.find( (numero) => numero == index );

    if(repeatNumber){
      return;
    }

    this.arrayNumbersChoose.push(index);
    this.ballService.chosenNumbers.next(this.arrayNumbersChoose);
  }

  clearSelection(){
    this.arrayNumbersChoose = [];
    this.ballService.chosenNumbers.next(this.arrayNumbersChoose);
  }

}
