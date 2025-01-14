import {
  Component,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { IEnumValue } from "@app/layout/content-template/page-default/page-field";
import { AppComponentBase } from "@shared/app-component-base";
import {
  InvoiceDto,
  InvoiceServiceProxy,
  ReceivingDto,
  ReceivingServiceProxy,
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "view-porchase-invoice",
  templateUrl: "./view-porchase-invoice.component.html",
  styleUrls: ["./view-porchase-invoice.component.scss"],
})
export class ViewPorchaseInvoiceComponent
  extends AppComponentBase
  implements OnChanges
{
  @Input() offerId: number;
  invoices: InvoiceDto[] = [];
  receivings: ReceivingDto[] = [];

  status: IEnumValue[] = [
    { value: 0, text: this.l("NotPriced") },
    { value: 1, text: this.l("PendingReceived") },
    { value: 2, text: this.l("PartialReceive") },
    { value: 3, text: this.l("Received") },
  ];
  currency: IEnumValue[] = [
    { value: 1, text: this.l("Dollar") },
    { value: 0, text: this.l("Dinar") },
  ];
  
  constructor(injector: Injector, 
    private invoiceService: InvoiceServiceProxy,
    private receivingService: ReceivingServiceProxy,) {
    super(injector);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.offerId) {
      this.initialInvoice();
    }
  }

  initialInvoice() {
    this.invoiceService.getByOfferId(this.offerId).subscribe((result) => {
      this.invoices = result;
      this.getReceivings(this.invoices.map(x=> x.id));
    });
  }

  getReceivings(invoicesId: number[]) {
    this.receivingService.getAllByInvoicesIds(invoicesId)
    .subscribe(result=>{
      this.receivings = result;
    })
  }

  getReceivingById(receivingId: number):ReceivingDto[]{
    return this.receivings.filter(x=>x.id == receivingId);
  }

  getStatus(value){
    return this.status.find(x=>x.value == value)?.text;
  }

  getCurrency(value){
    return this.currency.find(x=>x.value == value)?.text;
  }

}
