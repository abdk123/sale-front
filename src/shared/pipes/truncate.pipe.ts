import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string, limit: number = 50, ellipsis: string = '...'): string {
    if (value.length <= limit) {
      return value;
    }
    return value.substring(0, limit) + ellipsis;
  }
}
