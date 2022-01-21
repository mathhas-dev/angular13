import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  static readonly SUM: string = '+';
  static readonly SUB: string = '-';
  static readonly MULT: string = '*';
  static readonly DIV: string = '/';

  constructor() { }

  /**
   * Takes 2 numbers and return the result of the given operation
   * 
   * @param num1 number
   * @param num2 number
   * @param operation string that inform the type of the math operation
   * @returns operation result
   */
  calculate(num1: number, num2: number, operation: string): number {
    let result: number;

    if (operation == CalculatorService.SUM) {
      result = num1 + num2;
    } else if (operation == CalculatorService.SUB) {
      result = num1 - num2;
    } else if (operation == CalculatorService.MULT) {
      result = num1 * num2;
    } else if (operation == CalculatorService.DIV) {
      result = num1 / num2;
    }

    return result;
  }
}
