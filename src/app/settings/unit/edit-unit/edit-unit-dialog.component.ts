import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { UnitServiceProxy, UpdateUnitDto, UnitNameForDropdownDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'edit-unit-dialog',
  templateUrl: './edit-unit-dialog.component.html',

})
export class EditUnitDialogComponent extends AppComponentBase {
  saving = false;
  parentUnits: UnitNameForDropdownDto[] = [];
  id: number;
  unit = new UpdateUnitDto();
  @Output() onSave = new EventEmitter<any>();

  constructor(injector: Injector,
    private _unitService: UnitServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialAllParentUnits();
  }

  initialAllParentUnits(){
    this._unitService.getAllParentUnits()
    .subscribe((result)=>{
      this.parentUnits = result;
      this.initUnit();
    });
  }

  initUnit() {
    this._unitService.getIncludeParent(this.id).subscribe((result) => {
      this.unit = result;
    });
  }

  save(): void {
    debugger;
    this.saving = true;
    this._unitService
      .update(
        this.unit
      )
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response: any) => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      }
      );
  }
}
