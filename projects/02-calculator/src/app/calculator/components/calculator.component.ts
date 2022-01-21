import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../services';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  private num1: string;
  private num2: string;
  private result: number;
  private operation: string;

  constructor(private calculatorService: CalculatorService) { }

  ngOnInit() {
    this.clear();
  }

  /**
   * Initializes all operators to default values.
   *
   * @return void
   */
  clear(): void {
    this.num1 = '0';
    this.num2 = null;
    this.result = null;
    this.operation = null;
  }

  /**
   * Adds the selected number to the calculation later.
   *
   * @param string numero
   * @return void
   */
  addNumber(numero: string): void {
    if (this.operation === null) {
      this.num1 = this.concatenateNumber(this.num1, numero);
    } else {
      this.num2 = this.concatenateNumber(this.num2, numero);
    }
  }

  /**
   * Returns the concatenated value. Handles the decimal separator.
   *
   * @param string actualNum
   * @param string numConcat
   * @return string
   */
  concatenateNumber(actualNum: string, numConcat: string): string {
    if (actualNum === '0' || actualNum === null) {
      actualNum = '';
    }

    if (numConcat === '.' && actualNum === '') {
      return '0.';
    }

    if (numConcat === '.' && actualNum.indexOf('.') > -1) {
      return actualNum;
    }

    return actualNum + numConcat;
  }

  /**
   * Executes logic when an operator is selected.
   * If you already have an operation selected, execute the
   * previous operation, and defines the new operation.
   *
   * @param string operation
   * @return void
   */
  definesOpertation(operation: string): void {
    // only defines the operation if there is no
    if (this.operation === null) {
      this.operation = operation;
      return;
    }

    /* case operation defined and number 2 selected,
        perform the calculation of the operation */
    if (this.num2 !== null) {
      this.result = this.calculatorService.calculate(
        parseFloat(this.num1),
        parseFloat(this.num2),
        this.operation);
      this.operation = operation;
      this.num1 = this.result.toString();
      this.num2 = null;
      this.result = null;
    }
  }

  /**
   * Performs the calculation of an operation.
   *
   * @return void
   */
  calculate(): void {
    if (this.num2 === null) {
      return;
    }

    this.result = this.calculatorService.calculate(
      parseFloat(this.num1),
      parseFloat(this.num2),
      this.operation);
  }

  /**
   * Return the value to be displayed in the calculator
   *
   * @return string
   */
  get display(): string {
    if (this.result !== null) {
      return this.result.toString();
    }
    if (this.num2 !== null) {
      return this.num2;
    }
    return this.num1;
  }

}
