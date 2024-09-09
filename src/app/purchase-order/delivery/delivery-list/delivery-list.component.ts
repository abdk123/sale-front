import { Component, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { InvoiceDto, DeliveryDto, DeliveryServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent extends AppComponentBase implements OnInit,OnChanges {
  
  invoice: InvoiceDto = new InvoiceDto();
  deliveries:DeliveryDto[] = [];
  @Input() customerId: number;
  currencies = [
    { id: 1, name: this.l("Dollar") },
    { id: 0, name: this.l("Dinar") },
  ];

  constructor(
    injector: Injector,
    private router: Router,
    private deliveryService: DeliveryServiceProxy,
    private route: ActivatedRoute
  ) {
    super(injector);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.customerId){
      this.deliveryService.getAllByCustomerId(this.customerId)
      .subscribe(result=>{
        this.deliveries = result;
      });
    }
  }

  ngOnInit(): void {
    this.initialDelivery();
  }

  initialDelivery() {
    if(this.customerId){
      
    }
  }

  navigateToEditPage(item: DeliveryDto){
    this.router.navigate([
      "/app/orders/edit-delivery",
      {
        deliveryId: item.id
      },
    ]);
  }
}