import { Component, Injector, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { InvoiceDto, DeliveryDto, DeliveryServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent extends AppComponentBase implements OnInit {
  
  invoice: InvoiceDto = new InvoiceDto();
  deliveries:DeliveryDto[] = [];
  @Input() invoiceId: number;
  currencies = [
    { id: 0, name: this.l("Dollar") },
    { id: 1, name: this.l("Dinar") },
  ];

  constructor(
    injector: Injector,
    private router: Router,
    private deliveryService: DeliveryServiceProxy,
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialInvoice();
  }

  initialInvoice() {
    if(this.invoiceId){
      this.deliveryService.getAllByInvoiceId(this.invoiceId)
      .subscribe(result=>{
        this.deliveries = result;
      });
    }
  }

  navigateToEditPage(item: DeliveryDto){
    this.router.navigate([
      "/app/orders/edit-delivery",
      {
        deliveryId: item.id,
        invoiceId: item.invoiceId
      },
    ]);
  }
}