import { Component, Injector, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { RoleServiceProxy } from '@shared/service-proxies/service-proxies';
import { SharedService } from '@shared/services/shared.service';

@Component({
  templateUrl: './home.component.html',
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends AppComponentBase implements OnInit {
  constructor(injector: Injector,
) {
    super(injector);
  }
  ngOnInit(): void {

  }
}
