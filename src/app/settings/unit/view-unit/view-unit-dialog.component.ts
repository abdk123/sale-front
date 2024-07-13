import { Component, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { UnitServiceProxy, UnitDto, SizeDto, SizeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'view-unit-dialog',
  templateUrl: './view-unit-dialog.component.html',
})

export class ViewUnitDialogComponent extends AppComponentBase {
  saving = false;
  editable: true;
  id: number;
  unit: SizeDto = new SizeDto();

  constructor(injector: Injector,
    private _sizeService: SizeServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initUnit();
  }

  initUnit() {
    (this.id)
    this._sizeService.get(this.id).subscribe((result) => {
      this.unit = result;
    });
  }
}
