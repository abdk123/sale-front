import { Component, EventEmitter, Injector, Output } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CreateTransportCompanyDto,
  TransportCompanyServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";
import { finalize } from "rxjs";

@Component({
  selector: "create-transport-company",
  templateUrl: "./create-transport-company.component.html",
})
export class CreateTransportCompanyComponent extends AppComponentBase {
  saving = false;
  transportCompany = new CreateTransportCompanyDto();
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _transportCompanyService: TransportCompanyServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {}

  save(): void {
    this.saving = true;
    this._transportCompanyService
      .create(this.transportCompany)
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
