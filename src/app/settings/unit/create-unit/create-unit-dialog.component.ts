import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateSizeDto, CreateUnitDto,  SizeServiceProxy,  UnitServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: 'create-unit-dialog',
  templateUrl: './create-unit-dialog.component.html',
})

export class CreateUnitDialogComponent extends AppComponentBase {
  saving = false;
  unit = new CreateSizeDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(injector: Injector,
    private _sizeService: SizeServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void { 
    
  }

  save(): void {
    this.saving = true;
    this._sizeService
      .create(this.unit)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe((response: any) => {
        response;
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}
