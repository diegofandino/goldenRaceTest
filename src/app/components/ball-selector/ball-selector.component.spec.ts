import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallSelectorComponent } from './ball-selector.component';

describe('BallSelectorComponent', () => {
  let component: BallSelectorComponent;
  let fixture: ComponentFixture<BallSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BallSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BallSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The maximum balls chosen by user must be 8', () => {
    for (let i = 0; i < 8; i++) {
      component.chooseBall({number: i, color: '#'+(0x1000000+Math.random()*0xffffff).toString(16).substring(1,7)});
      expect(component.arrayNumbersChoose.length).toBeLessThanOrEqual(8);
      i++;
    }
  });


});
