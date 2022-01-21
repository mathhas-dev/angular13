import { inject, TestBed } from '@angular/core/testing';

import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('must ensure that 1+4=5',
    inject([CalculatorService], (service: CalculatorService) => {
      let sum = service.calculate(1, 4, CalculatorService.SUM);
      expect(sum).toEqual(5);
    })
  );

  it('must ensure that 1-4=-3',
    inject([CalculatorService], (service: CalculatorService) => {
      let sub = service.calculate(1, 4, CalculatorService.SUB);
      expect(sub).toEqual(-3);
    })
  );

  it('must ensure that 1*4=4',
    inject([CalculatorService], (service: CalculatorService) => {
      let mult = service.calculate(1, 4, CalculatorService.MULT);
      expect(mult).toEqual(4);
    })
  );

  it('must ensure that 1/4=0.25',
    inject([CalculatorService], (service: CalculatorService) => {
      let div = service.calculate(1, 4, CalculatorService.DIV);
      expect(div).toEqual(0.25);
    })
  );

});
