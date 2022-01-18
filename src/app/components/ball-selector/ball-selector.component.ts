import { Component, OnInit } from '@angular/core';
import { ballIndividual } from 'src/app/interfaces/ball';
import { BallServicesService } from 'src/app/services/ballServices/ball-services.service';

@Component({
  selector: 'app-ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss']
})
export class BallSelectorComponent implements OnInit {

  arrayNumbers: ballIndividual[] = [];
  arrayNumbersChoose: ballIndividual[] = [];
  winnerBet: ballIndividual = {number: 0, color: ''};
  LooseBet: ballIndividual = {number: 0, color: ''};
  winnerBallBet: number = 0;
  showMessageBet: boolean = false;
  constructor(private ballService : BallServicesService) { }

  ngOnInit(): void {
    
    //create Array numbers
    this.loopArray(10);
    //indicates the number of balls
    this.ballService.numberBalls = 10;

    //subscribe to listen the real bet
    this.ballService.betNumbers.subscribe( (arrayBalls) => {
      if(arrayBalls.length > 0){
        this.showMessageBet = true;
        this.winnerBallBet = this.betRandomNumber(1,this.ballService.numberBalls);
        let isFindBall = arrayBalls.find( (ball) => ball.number === this.winnerBallBet );
        if(isFindBall != undefined){
          this.winnerBet = isFindBall;
        } else {
          this.LooseBet = {number: this.winnerBallBet, color: '#f5f5f5'};
        }
      } 
    })

  }

  //function that fill the array of balls
  loopArray(numberBets: number){
    for (let i = 1; i <= numberBets; i++) {
        
        this.arrayNumbers.push({number: i, color: '#'+(0x1000000+Math.random()*0xffffff).toString(16).substring(1,7)});      
    }
  }

  //function that choose the ball selected by user
  chooseBall(object: any){
    
    if(this.arrayNumbersChoose.length == 0){
      this.arrayNumbersChoose.push({number: object.number, color: object.color});
      this.ballService.chosenNumbers.next([...this.arrayNumbersChoose]);
    } else {

      let repeatNumber = this.arrayNumbersChoose.find( (number) => number.number == object.number );
  
      if(repeatNumber){
        return;
      } else {
            this.arrayNumbersChoose.push(object);
            this.ballService.chosenNumbers.next([...this.arrayNumbersChoose]);
      }
  
    }

  }

  //function that clear all
  clearSelection(){
    this.showMessageBet = false;
    this.arrayNumbersChoose = [];
    this.winnerBallBet = 0;
    this.winnerBet = {number: 0, color: ''};
    this.LooseBet = {number: 0, color: ''};
    this.ballService.chosenNumbers.next([]);
    this.ballService.betNumbers.next([]);
  }

  //When play game, this function select the winner ball
  betRandomNumber = (min: number, max: number) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

}
