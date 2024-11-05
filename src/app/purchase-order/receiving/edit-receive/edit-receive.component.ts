import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { ClearanceCompanyServiceProxy, DropdownDto, InvoiceDto, InvoiceServiceProxy, ReceivingDto, ReceivingServiceProxy, TransportCompanyDto, TransportCompanyServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';

@Component({
  selector: "edit-receive",
  templateUrl: "./edit-receive.component.html",
  styleUrls: ["./edit-receive.component.scss"],
})
export class EditReceiveComponent extends AppComponentBase implements OnInit {
  invoice: InvoiceDto = new InvoiceDto();
  receiveDto: ReceivingDto = new ReceivingDto();
  invoiceId: number;
  receivingId: number;
  saving: boolean;
  date: Date = new Date();
  transportCompanies: DropdownDto[] = [];
  clearanceCompanies: DropdownDto[] = [];
  currencies = [
    { id: 1, name: this.l("Dollar") },
    { id: 0, name: this.l("Dinar") },
  ];

  constructor(
    injector: Injector,
    private router: Router,
    private invoiceService: InvoiceServiceProxy,
    private transportCompanyService: TransportCompanyServiceProxy,
    private clearanceCompanyServiceProxy: ClearanceCompanyServiceProxy,
    private receivingServiceProxy: ReceivingServiceProxy,
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot?.params?.invoiceId;
    this.receivingId = this.route.snapshot?.params?.receivingId;
    this.initialReceiving();
    this.initialInvoice();
    this.initialTransportCompanies();
    this.initialClearanceCompanies();
  }

  initialReceiving() {
    this.receivingServiceProxy.getWithDetail(this.receivingId).subscribe((result) => {
      this.receiveDto = result;
    });
  }

  initialTransportCompanies() {
    this.transportCompanyService
      .getForDropdown()
      .subscribe((result) => (this.transportCompanies = result));
  }

  initialClearanceCompanies() {
    this.clearanceCompanyServiceProxy
      .getForDropdown()
      .subscribe((result) => (this.clearanceCompanies = result));
  }

  initialInvoice() {
    this.invoiceService.getWithDetail(this.invoiceId).subscribe((result) => {
      this.invoice = result;
    });
  }

  save() {
    const invalidMaterial = this.checkEnteredQuantities();
    if (invalidMaterial == "") {
      this.receiveDto.creationTime = this.date.toISOString();
      this.receiveDto.invoiceId = this.invoiceId;
      this.saving = true;
      this.receivingServiceProxy
        .update(this.receiveDto)
        .pipe(
          finalize(() => {
            this.saving = false;
            this.notify.info(this.l("SavedSuccessfully"));
            this.router.navigate(["/app/orders/receives"]);
          })
        )
        .subscribe((result) => {});
    } else {
      const title = `المادة ${invalidMaterial}`;
      const message = `القيمة المدخلة يجب ان تكون اصغر او تساوي القيمة المتبقية`;
      this.showErrorMessage(message, title);
    }
  }

  checkEnteredQuantities() {
    var invalidMaterial = "";
    var invoiceItems = this.invoice.invoiseDetails;
    this.receiveDto.receivingItems.forEach((item) => {
      var invoiceItem = invoiceItems.find((x) => x.id == item.invoiceItemId);
      if (invoiceItem) {
        var notReceivedQuantity =
          invoiceItem.quantity - invoiceItem.receivedQuantity + this.enteredQ(invoiceItem.id);
        if (item.receivedQuantity > notReceivedQuantity) {
          invalidMaterial = invoiceItem?.offerItem?.material?.name;
        }
      }
    });
    return invalidMaterial;
  }

  enteredQ(id) {
    let item = this.receiveDto.receivingItems.find(
      (x) => x.invoiceItemId === id
    );
    const quantity = item != undefined ? item.receivedQuantity : 0;
    return quantity;
  }

  showErrorMessage(message, title) {
    abp.message.warn(message, title);
  }
}
