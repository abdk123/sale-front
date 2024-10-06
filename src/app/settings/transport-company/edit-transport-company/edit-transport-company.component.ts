import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  UpdateTransportCompanyDto,
  TransportCompanyServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";
import { finalize } from "rxjs";

@Component({
  selector: "edit-transport-company",
  templateUrl: "./edit-transport-company.component.html",
  styles: [
    `
      .form-control {
        padding: 0.3rem 0.5rem !important;
      }
    `,
  ],
})
export class EditTransportCompanyComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  transportCompany = new UpdateTransportCompanyDto();
  id: number;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    public _transportCompanyService: TransportCompanyServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialTransportCompany();
  }

  initialTransportCompany() {
    this._transportCompanyService
      .getForEdit(this.id)
      .subscribe((result: UpdateTransportCompanyDto) => {
        this.transportCompany = result;
      });
  }

  save(): void {
    this.saving = true;
    this._transportCompanyService
      .update(this.transportCompany)
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
