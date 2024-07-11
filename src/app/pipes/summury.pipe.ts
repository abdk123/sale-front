import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary'
})
export class SummaryPipe implements PipeTransform {

  transform(value: string, limit?: number): any {
    if (!value) return null;
    let acctuallimit = (limit) ? limit : 20;
    if (value.length > acctuallimit)
      return value.substring(0, acctuallimit) + '...'
    else return value


  }

}
