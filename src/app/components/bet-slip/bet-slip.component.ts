import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ballIndividual } from 'src/app/interfaces/ball';
import { BallServicesService } from '../../services/ballServices/ball-services.service';

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss']
})
export class BetSlipComponent implements OnInit {

  arrayNumberChosen: ballIndividual[] = [];
  arrayNumberBalls: ballIndividual[] = [];
  priceControl: number = 0;
  totalAmount: number = 0;
  constructor(private ballService :BallServicesService ) { }

  ngOnInit(): void {
    
    //indexBalls
    let index = 0;

    //Number of balls
    this.arrayNumberChosen =  Array.from({length: this.ballService.numberBalls}, (_, i) => ({numero: 0, color: '#f5f5f5'}));

    //Balls
    this.ballService.chosenNumbers.subscribe((value: any) => {
      if(value.length <= 0){
        this.arrayNumberChosen =  Array.from({length: this.ballService.numberBalls}, (_, i) => ({numero: 0, color: '#f5f5f5'}));
        index = 0;
        return;
      }
      let lastPosition = value.pop();
      this.arrayNumberChosen[index] = lastPosition;
      index++;
   });
  }

  validateMinAmount(){
    if(this.priceControl <= 0){
      alert('Minimum bet is 5€');
      return;
    }

    this.totalAmount = this.priceControl * 5;

  }

  placeBet(){
    
    for( var i = 0; i < this.arrayNumberChosen.length; i++){ 
      
      if ( this.arrayNumberChosen[i].numero === 0) { 
        
        this.arrayNumberChosen.splice(i, 1);
        i--;
      }
      
    }
    
    console.log(this.arrayNumberChosen);
  }

}
