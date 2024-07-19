import { Component, Input } from '@angular/core';

@Component({
  selector: 'item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent {
  @Input() title:string = '';
  @Input() value:string = '';
  @Input() icon:string = '';
}
