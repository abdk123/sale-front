import { Component, EventEmitter, Injector, OnInit, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { UpdateClearanceCompanyDto, ClearanceCompanyServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

@Component({
  selector: "edit-clearance-company",
  templateUrl: "./edit-clearance-company.component.html",
  styles: [
    `
      .form-control {
        padding: 0.3rem 0.5rem !important;
      }
    `,
  ],
})
export class EditClearanceCompanyComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  clearanceCompany = new UpdateClearanceCompanyDto();
  id: number;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    public _clearanceCompanyService: ClearanceCompanyServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialClearanceCompany();
  }

  initialClearanceCompany() {
    this._clearanceCompanyService
      .getForEdit(this.id)
      .subscribe((result: UpdateClearanceCompanyDto) => {
        this.clearanceCompany = result;
      });
  }

  save(): void {
    this.saving = true;
    this._clearanceCompanyService
      .update(this.clearanceCompany)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }
}