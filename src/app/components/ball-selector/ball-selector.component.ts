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
  arrayNumbersChoose: any[] = [];
  constructor(private ballService : BallServicesService) { }

  ngOnInit(): void {
    this.loopArray(10);
    this.ballService.numberBalls = 10;
  }

  loopArray(numberBets: number){
    for (let i = 1; i <= numberBets; i++) {
        
        this.arrayNumbers.push({numero: i, color: '#'+(0x1000000+Math.random()*0xffffff).toString(16).substring(1,7)});      
    }
  }

  chooseBall(object: any){
    
    if(this.arrayNumbersChoose.length == 0){
      this.arrayNumbersChoose.push({numero: object.numero, color: object.color});
      this.ballService.chosenNumbers.next([...this.arrayNumbersChoose]);
    } else {

      let repeatNumber = this.arrayNumbersChoose.find( (numero) => numero.numero == object.numero );
  
      if(repeatNumber){
        return;
      } else {
            this.arrayNumbersChoose.push(object);
            this.ballService.chosenNumbers.next([...this.arrayNumbersChoose]);
      }
  
    }

  }

  clearSelection(){
    this.arrayNumbersChoose = [];
    this.ballService.chosenNumbers.next([]);
  }

}
