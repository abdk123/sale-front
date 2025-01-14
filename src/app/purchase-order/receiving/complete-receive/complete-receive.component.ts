import { Component, Injector, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import {
  ClearanceCompanyServiceProxy,
  CompleteReceivingDto,
  DropdownDto,
  InvoiceDto,
  InvoiceServiceProxy,
  ReceivingDto,
  ReceivingServiceProxy,
  TransportCompanyDto,
  TransportCompanyServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { finalize } from "rxjs";

@Component({
  selector: "complete-receive",
  templateUrl: "./complete-receive.component.html",
  styleUrls: ["./complete-receive.component.scss"],
})
export class CompleteReceiveComponent
  extends AppComponentBase
  implements OnInit
{
  invoice: InvoiceDto = new InvoiceDto();
  receiveDto: ReceivingDto = new ReceivingDto();
  input: CompleteReceivingDto = new CompleteReceivingDto();
  invoiceId: number;
  receivingId: number;
  saving: boolean;
  date: Date = new Date();
  transportCompanies: DropdownDto[] = [];
  clearanceCompanies: DropdownDto[] = [];
  currencies = [
    { id: 0, name: this.l("Dinar") },
    { id: 1, name: this.l("Dollar") },
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
    this.receivingId = this.route.snapshot?.params?.receiveId;
    this.initialReceiving();
    this.initialInvoice();
    this.initialTransportCompanies();
    this.initialClearanceCompanies();
  }

  initialReceiving() {
    this.receivingServiceProxy
      .getWithDetail(this.receivingId)
      .subscribe((result) => {
        this.receiveDto = result;
        this.input.init({
          id: result.id,
          transportCost: result.transportCost,
          transportCostCurrency: result.transportCostCurrency,
          driverName: result.driverName,
          driverPhoneNumber: result.driverPhoneNumber,
          transportCompanyId: result.transportCompanyId,
          clearanceCost: result.clearanceCost,
          clearanceCostCurrency: result.clearanceCostCurrency,
          clearanceCompanyId: result.clearanceCompanyId,
        });
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
    this.receiveDto.creationTime = this.date.toISOString();
    this.receiveDto.invoiceId = this.invoiceId;
    this.saving = true;
    this.receivingServiceProxy
      .completeInfo(this.input)
      .pipe(
        finalize(() => {
        })
      )
      .subscribe((result) => {
        this.saving = false;
          this.notify.info(this.l("SavedSuccessfully"));
        this.router.navigateByUrl(
          "/app/orders/receives;invoiceId=" + this.invoiceId,
        );
      });
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
