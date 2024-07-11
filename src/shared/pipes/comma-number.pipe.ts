import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaNumber'
})
export class CommaNumberPipe implements PipeTransform {

  transform(value: number, ...args: any[]): string {
    const commaDimension = args[0] as number;
    var roundValue = commaDimension ? Math.pow(10, commaDimension) : 100;
    value = Math.round(value * roundValue) / roundValue;
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // private numberWithCustomPositionSeparator(value: number): string {
  //   let stringValue = value.toString();
  //   let result = '';
  //   for (let i = 0; i < stringValue.length; i++) {
  //     result += stringValue[i];
  //     if ((stringValue.length - 1 - i) % 3 === 0 && i !== stringValue.length - 1) {
  //       result += ',';
  //     }
  //   }
  //   return result;
  // }
}