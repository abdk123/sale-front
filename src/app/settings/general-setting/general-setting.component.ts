import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { ClearDatabaseOutput, MigrationServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.scss']
})
export class GeneralSettingComponent extends AppComponentBase {
  saving = false;
  public password: string = '';

  constructor(injector: Injector,
    private migrationServiceProxy: MigrationServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void { 
  }

  save(): void {
    this.saving = true;
    this.migrationServiceProxy
      .clear(this.password)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response: ClearDatabaseOutput) => {
        if(response?.errorMessage == 'Success')
          this.notify.success(response.errorMessage);
        else{
          this.notify.error(response.errorMessage);
        }
      });
  }
}
