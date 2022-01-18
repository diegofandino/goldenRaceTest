import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { BetSlipComponent } from './bet-slip.component';

describe('BetSlipComponent', () => {
  let component: BetSlipComponent;
  let fixture: ComponentFixture<BetSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetSlipComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('the input with name "PriceControl" should be initialized in 0', () => {
    expect(component.priceControl).toBe(0);

  });
  
  it('Validate that the price control have min 5€', () => {

    let input = fixture.debugElement.query(By.css('input#inputPriceControl'));
    let btnElement = fixture.debugElement.query(By.css('button#btnValidateAmount'));
    let el = input.nativeElement;
    el.value = 1;
    el.dispatchEvent(new Event('input'));
    btnElement.nativeElement.click();
    fixture.detectChanges();
    expect(component.priceControl).toBeGreaterThanOrEqual(1);

  });

});
