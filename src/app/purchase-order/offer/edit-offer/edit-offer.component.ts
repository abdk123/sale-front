import { AppComponentBase } from '@shared/app-component-base';
import { Component,Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownDto, UpdateOfferDto, CustomerServiceProxy, OfferServiceProxy, UpdateOfferItemDto } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: "edit-offer",
  templateUrl: "./edit-offer.component.html",
  styleUrls: ["./edit-offer.component.scss"],
})
export class EditOfferComponent extends AppComponentBase implements OnInit {
  offer: UpdateOfferDto = new UpdateOfferDto();
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
    private _offerService: OfferServiceProxy,
    private _route: ActivatedRoute
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.id = this._route.snapshot?.params?.id;
    this.initialOffer();
    this.initialCustomers();
  }

  endDate: string;
  initialOffer() {
    this._offerService
      .getForEdit(this.id)
      .subscribe((result: UpdateOfferDto) => {
        this.offer = result;
        this.endDate = new DatePipe("en-US").transform(
          this.offer.offerEndDate,
          "dd-MM-yyyy"
        );
      });
  }

  initialCustomers() {
    this._customerService.getForDropdown().subscribe((result) => {
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
    this.customerIsRequired = this.offer.customerId ? false : true;
    this.statusIsRequired = this.offer.status == undefined ? true : false;
    this.currencyIsRequired = this.offer.currency == undefined ? true : false;
    if (
      !this.customerIsRequired &&
      !this.statusIsRequired &&
      !this.currencyIsRequired
    ) {
      if (!this.offer.offerItems) {
        abp.message.warn(this.l("PleaseAddAtLeastOneMaterial"));
      }
      if (!this.offer.porchaseOrderId && this.offer.status == 1) {
        abp.message.warn(this.l("PoNumberIsRequired"));
      }
      this.saving = true;
      this.offer.offerEndDate = this.endDate;
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

  onSaveOfferItem(items: UpdateOfferItemDto[]) {
    this.offer.offerItems = items;
  }
}

