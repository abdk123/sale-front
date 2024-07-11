import { Component } from '@angular/core';
import loginItems, { ILogin } from './logins';

@Component({
  selector: 'last-logins',
  templateUrl: './last-logins.component.html',
  styleUrls: ['./last-logins.component.scss']
})
export class LastLoginsComponent {
  constructor() { }

  data: ILogin[] = loginItems;


}
