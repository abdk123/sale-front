import { Directive, EventEmitter, Input, Output } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string;
  direction: SortDirection;
}


@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.bi-sort-down]': 'direction === "asc"',
    '[class.bi-sort-up]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class BtSortableHeader {

  @Input() sortable: string;
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    if(this.sortable){
      this.direction = rotate[this.direction];
      this.sort.emit({column: this.sortable, direction: this.direction});
    }
  }

}
