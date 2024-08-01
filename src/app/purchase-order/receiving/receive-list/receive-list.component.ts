import { Component, Injector, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { InvoiceDto, ReceivingDto, ReceivingServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'receive-list',
  templateUrl: './receive-list.component.html',
  styleUrls: ['./receive-list.component.scss']
})
export class ReceiveListComponent extends AppComponentBase implements OnInit {
  
  invoice: InvoiceDto = new InvoiceDto();
  receives:ReceivingDto[] = [];
  @Input() invoiceId: number;
  currencies = [
    { id: 0, name: this.l("Dollar") },
    { id: 1, name: this.l("Dinar") },
  ];

  constructor(
    injector: Injector,
    private router: Router,
    private receivingService: ReceivingServiceProxy,
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialInvoice();
  }

  initialInvoice() {
    if(this.invoiceId){
      this.receivingService.getAllByInvoiceId(this.invoiceId)
      .subscribe(result=>{
        this.receives = result;
      });
    }
  }

  navigateToEditPage(item: ReceivingDto){
    this.router.navigate([
      "/app/orders/edit-receive",
      {
        receivingId: item.id,
        invoiceId: item.invoiceId,
        totalReceivedQuantity: item.totalReceivedQuantity,
      },
    ]);
  }
}