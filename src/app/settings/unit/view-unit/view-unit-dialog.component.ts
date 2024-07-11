import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { UnitServiceProxy, UnitDto } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-unit-dialog',
  templateUrl: './view-unit-dialog.component.html',
})

export class ViewUnitDialogComponent extends AppComponentBase {
  saving = false;
  editable: true;
  id: number;
  unit: UnitDto = new UnitDto();

  constructor(injector: Injector,
    private _unitService: UnitServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initUnit();
  }

  initUnit() {
    (this.id)
    this._unitService.getIncludeParent(this.id).subscribe((result) => {
      this.unit = result;
    });
  }
}
