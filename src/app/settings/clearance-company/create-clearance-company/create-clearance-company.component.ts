import { Component, EventEmitter, Injector, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CreateClearanceCompanyDto, ClearanceCompanyServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: "create-clearance-company",
  templateUrl: "./create-clearance-company.component.html",
  styles: [
    `
      .form-control {
        padding: 0.3rem 0.5rem !important;
      }
    `,
  ],
})
export class CreateClearanceCompanyComponent extends AppComponentBase {
  saving = false;
  clearanceCompany = new CreateClearanceCompanyDto();
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _clearanceCompanyService: ClearanceCompanyServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  save(): void {
    this.saving = true;
    this._clearanceCompanyService
      .create(this.clearanceCompany)
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