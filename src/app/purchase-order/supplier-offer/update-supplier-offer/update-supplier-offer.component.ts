import { AppComponentBase } from '@shared/app-component-base';
import { Component,Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownDto, UpdateSupplierOfferDto, CustomerServiceProxy, SupplierOfferServiceProxy, UpdateSupplierOfferItemDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: "update-supplier-offer",
  templateUrl: "./update-supplier-offer.component.html",
  styleUrls: ["./update-supplier-offer.component.scss"],
})
export class UpdateSupplierOfferComponent extends AppComponentBase implements OnInit {
  offer: UpdateSupplierOfferDto = new UpdateSupplierOfferDto();
  saving = false;
  id: number;
  customerIsRequired = false;
  currencyIsRequired = false;
  statusIsRequired = false;
  showPorchaseOrder = false;
  customers: DropdownDto[] = [];
  itemIndex: number;
  currencies = [
    { id: 1, name: this.l("Dollar") },
    { id: 0, name: this.l("Dinar") },
  ];
  status = [
    { id: 0, name: this.l("WaitingApprove") },
    { id: 1, name: this.l("Approved") },
  ];
  constructor(
    injector: Injector,
    private _router: Router,
    private _customerService: CustomerServiceProxy,
    private _offerService: SupplierOfferServiceProxy,
    private _route: ActivatedRoute
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.id = this._route.snapshot?.params?.id;
    this.initialSupplierOffer();
    this.initialSuppliers();
  }

  endDate: string;
  initialSupplierOffer() {
    this._offerService
      .getForEdit(this.id)
      .subscribe((result: UpdateSupplierOfferDto) => {
        this.offer = result;
        this.endDate = new DatePipe("en-US").transform(
          this.offer.supplierOfferEndDate,
          "dd-MM-yyyy"
        );
      });
  }

  initialSuppliers() {
    this._customerService.getSuppliers().subscribe((result) => {
      this.customers = result;
    });
  }

  onChangeStatus(status) {
    if (status?.id == 1) {
      this.showPorchaseOrder = true;
    } else {
      this.showPorchaseOrder = false;
      this.offer.porchaseOrderId = "";
    }
  }

  save() {
    this.customerIsRequired = this.offer.supplierId ? false : true;
    this.statusIsRequired = this.offer.status == undefined ? true : false;
    this.currencyIsRequired = this.offer.currency == undefined ? true : false;
    if (
      !this.customerIsRequired &&
      !this.statusIsRequired &&
      !this.currencyIsRequired
    ) {
      if (!this.offer.supplierOfferItems) {
        abp.message.warn(this.l("PleaseAddAtLeastOneMaterial"));
      }
      if (!this.offer.porchaseOrderId && this.offer.status == 1) {
        abp.message.warn(this.l("PoNumberIsRequired"));
      }
      this.saving = true;
      this.offer.supplierOfferEndDate = this.endDate;
      this._offerService
        .update(this.offer)
        .pipe(
          finalize(() => {
            this.saving = false;
            this.notify.info(this.l("SavedSuccessfully"));
            this._router.navigate(["/app/orders/offers"]);
          })
        )
        .subscribe((result) => {});
    }
  }

  onSaveSupplierOfferItem(items: UpdateSupplierOfferItemDto[]) {
    this.offer.supplierOfferItems = items;
  }
}

