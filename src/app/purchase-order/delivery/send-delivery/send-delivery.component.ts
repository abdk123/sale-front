import { Component, Injector, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AppComponentBase } from "@shared/app-component-base";
import {
  DropdownDto,
  CreateDeliveryDto,
  DeliveryServiceProxy,
  OfferDto,
  OfferServiceProxy,
  BalanceInfoDto,
  CustomerServiceProxy,
  CustomerCashFlowServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { finalize } from "rxjs";

@Component({
  selector: "send-delivery",
  templateUrl: "./send-delivery.component.html",
  styleUrls: ["./send-delivery.component.scss"],
})
export class SendDeliveryComponent extends AppComponentBase implements OnInit {
  deliveryDto: CreateDeliveryDto = new CreateDeliveryDto();
  customerId: number;
  saving: boolean;
  customers: DropdownDto[] = [];
  customerIsRequired: boolean = false;
  customerBalance : BalanceInfoDto = new BalanceInfoDto();

  currencies = [
    { id: 0, name: this.l("Dinar") },
    { id: 1, name: this.l("Dollar") },
    
  ];

  constructor(
    injector: Injector,
    private router: Router,
    private customerService: CustomerServiceProxy,
    private customerCashFlowService: CustomerCashFlowServiceProxy,
    private deliveryService: DeliveryServiceProxy,
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    //this.customerId = this.route.snapshot?.params?.customerId;
    //this.initialOffer();
    this.initialCustomers();
  }

  initialCustomers() {
    this.customerService.getForDropdown().subscribe((result) => {
      this.customers = result;
    });
  }

  // initialOffer() {
  //   this.offerService.getOfferWithDetailId(this.offerId).subscribe((result) => {
  //     this.offer = result;
  //   });
  // }

  save() {
    this.saving = true;
    this.deliveryDto.customerId = this.customerId;
    this.deliveryService
      .create(this.deliveryDto)
      .pipe(
        finalize(() => {
          this.saving = false;
          this.notify.info(this.l("SavedSuccessfully"));
          this.router.navigate(["/app/orders/manage-delivery"]);
        })
      )
      .subscribe((result) => {});
  }

  onSelectCustomer(args){
    this.customerCashFlowService.getBalance(this.deliveryDto.customerId)
    .subscribe((result: BalanceInfoDto)=>{
      this.customerBalance = result;
    })
  }
}
