import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Injector
} from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { filter as _filter } from 'lodash-es';

@Component({
  selector: 'header-logo',
  templateUrl: './header-logo.component.html',
  styles:[`.bg-log{
    background-image: url(../../../assets/img/logo/balloon.png);
    height: 50px;
    width: 300px;
    background-size: cover;
    background-position: center;
  }`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLogoComponent extends AppComponentBase
  implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
  }
}
