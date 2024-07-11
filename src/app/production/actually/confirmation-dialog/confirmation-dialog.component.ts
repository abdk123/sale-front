import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { PlanServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent extends AppComponentBase{
  saving = false;
  id;
  cancelLabel = this.l('Cancel');
   cancelDisabled: boolean=false;
   saveLabel = this.l('Confirmation');
  saveIcon = 'bi bi-check-lg';
   cancelIcon = 'bi bi-x-lg';

  warning =this.l("Warning");
  constructor(
    injector: Injector,
    public _planService:PlanServiceProxy,
    public bsModalRef:BsModalRef){super(injector);}

    onSave(): void {
      this.saving = true;
      this._planService.changeStatusToArchive(this.id).subscribe((result)=>{
        this.bsModalRef.hide();
        this.notify.info(this.l('SavedSuccessfully'));
        setTimeout(() => {
          location.reload();
        }, 2000);
      })
    }

    onCancelClick(){
      this.bsModalRef.hide();
    }
}
