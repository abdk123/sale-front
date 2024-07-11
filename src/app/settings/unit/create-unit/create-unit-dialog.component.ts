import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateUnitDto,  UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-unit-dialog',
  templateUrl: './create-unit-dialog.component.html',
})

export class CreateUnitDialogComponent extends AppComponentBase {
  saving = false;
  unit = new CreateUnitDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(injector: Injector,
    private _unitService: UnitServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void { 
    
  }

  save(): void {
    this.saving = true;
    this._unitService.
      create(
        this.unit
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response: any) => {
        (response);
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
