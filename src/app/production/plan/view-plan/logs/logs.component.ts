import { Component } from '@angular/core';
import logItems, { ILog }from './logs'

@Component({
  selector: 'plan-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent {
  constructor() { }

  data: ILog[] = logItems;
}
