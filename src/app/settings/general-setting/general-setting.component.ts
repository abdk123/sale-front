import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { ConfigurationServiceProxy, SettingInput } from '@shared/service-proxies/service-proxies';
import { BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'general-setting',
  templateUrl: './general-setting.component.html',

})
export class GeneralSettingComponent extends AppComponentBase {

  saving = false;
  title=this.l("GeneralSetting");
  settings: SettingInput[] = [];
  expiryDurationNotify: string = this.setting.get('App.Hcpc.ExpiryDurationNotify');
  ssrsUrl: string = this.setting.get('App.Srss.Url');
  ssrsFolder: string = this.setting.get('App.Srss.Folder');
  constructor(    injector: Injector,
    private _modalService: BsModalService,
    private _configurationService:ConfigurationServiceProxy,
    ) {
    super(injector);
  }
  ngOnInit(): void {
    
  }

  save(): void {
    this.settings.push(new SettingInput({name:'App.Hcpc.ExpiryDurationNotify',value:this.expiryDurationNotify}));
    this.settings.push(new SettingInput({name:'App.Srss.Url',value:this.ssrsUrl}));
    this.settings.push(new SettingInput({name:'App.Srss.Folder',value:this.ssrsFolder}));
    this._configurationService.
    changeSettings(
        this.settings
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response: any) => {
        this.notify.info(this.l('SavedSuccessfully'));
      });

  }
  
}


