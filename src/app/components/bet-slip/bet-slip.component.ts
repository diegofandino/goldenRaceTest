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
  numberStack: number = 0;
  totalAmount: number = 0;
  constructor(private ballService :BallServicesService ) { }

  ngOnInit(): void {
    
    //indexBalls
    let index = 0;

    //Number of balls
    this.arrayNumberChosen =  Array.from({length: this.ballService.numberBalls}, (_, i) => ({number: 0, color: '#f5f5f5'}));

    //Balls
    this.ballService.chosenNumbers.subscribe((value: any) => {
      
      //change stake
      this.numberStack = value.length;
      if(this.totalAmount != 0){
        this.priceControl = 0;
        this.totalAmount = 0
      }

      if(value.length <= 0){
        this.arrayNumberChosen =  Array.from({length: this.ballService.numberBalls}, (_, i) => ({number: 0, color: '#f5f5f5'}));
        index = 0;
        return;
      }
      let lastPosition = value.pop();
      this.arrayNumberChosen[index] = lastPosition;
      index++;
   });
  }

  //This function multiply the price input by user for number of balls
  validateMinAmount(){
    this.totalAmount = this.priceControl * this.numberStack;
  }

  //Function that start the game
  placeBet(){

    //First, it is verify if the user doesn't have selected at least one ball
    let verifyEmptyArray = this.arrayNumberChosen.filter( (eachBall) => eachBall.number != 0 );

    if(verifyEmptyArray.length <= 0 ){
      alert('You must select at least one ball.');
      return;
    }

    //Verify the total amount of bet
    if(this.totalAmount == 0){
      alert('You need press in button "Ok" to calculate your bet');
      return;
    }
    
    //Verify if the bet have minimum 5€
    if(this.totalAmount < 5){
      alert('Minimum bet is 5€');
      return;
    }
    
    
    for( var i = 0; i < this.arrayNumberChosen.length; i++){ 
      
      if ( this.arrayNumberChosen[i].number === 0) { 
        
        this.arrayNumberChosen.splice(i, 1);
        i--;
      }
      
    }
    
    this.ballService.amountBet = this.totalAmount;
    this.ballService.betNumbers.next(this.arrayNumberChosen);
  }

}
