import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'format'
})
export class DateFormattedPipe implements PipeTransform {

  transform(value: any, format: string = 'yyyy-MM-DD'): string {
    return moment(value).format(format);
  }

}
