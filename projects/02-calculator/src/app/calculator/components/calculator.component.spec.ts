import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { By } from '@angular/platform-browser';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalculatorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Must ensure that 2.5 * 3 = 7.5', () => {
    let btn2 = fixture.debugElement.query(By.css('#btn2'));
    let btn3 = fixture.debugElement.query(By.css('#btn3'));
    let btn5 = fixture.debugElement.query(By.css('#btn5'));
    let btn7 = fixture.debugElement.query(By.css('#btn7'));
    let btnDot = fixture.debugElement.query(By.css('#btnDot'));
    let btnMult = fixture.debugElement.query(By.css('#btnMult'));
    let btnCalculate = fixture.debugElement.query(By.css('#btnCalculate'));
    let display = fixture.debugElement.query(By.css('#display'));

    btn2.triggerEventHandler('click', null);
    fixture.detectChanges();

    btnDot.triggerEventHandler('click', null);
    fixture.detectChanges();

    btn5.triggerEventHandler('click', null);
    fixture.detectChanges();

    btnMult.triggerEventHandler('click', null);
    fixture.detectChanges();

    btn3.triggerEventHandler('click', null);
    fixture.detectChanges();
    
    btnCalculate.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(display.nativeElement.value).toEqual('7.5');
  });

});
