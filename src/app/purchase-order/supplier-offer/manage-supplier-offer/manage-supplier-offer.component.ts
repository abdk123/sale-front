import { DatePipe } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { ChangeOfferStatusDto, SupplierOfferDto, SupplierOfferServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';

@Component({
  selector: 'manage-offer',
  templateUrl: './manage-supplier-offer.component.html',
  styleUrls: ['./manage-supplier-offer.component.scss']
})
export class ManageSupplierOfferComponent extends AppComponentBase implements OnInit {
  offer: SupplierOfferDto = new SupplierOfferDto();
  changeStatusInput: ChangeOfferStatusDto = new ChangeOfferStatusDto();
  
  saving = false;
  id: number;
  statusIsRequired = false;
  endDate: string;
  approveDate:Date = new Date();
  status = [
    { id: 0, name: this.l("WaitingApprove") },
    { id: 1, name: this.l("Approved") },
  ];
  constructor(
    injector: Injector,
    private router: Router,
    
    private offerService: SupplierOfferServiceProxy,
    private route: ActivatedRoute
  ) {
    super(injector);
  }
  ngOnInit(): void {
    
    this.id = this.route.snapshot?.params?.id;
    this.initialSupplierOffer();
  }

  initialSupplierOffer() {
    this.offerService
      .getSupplierOfferWithDetailId(this.id)
      .subscribe((result: SupplierOfferDto) => {
        this.offer = result;
        this.initialValue();
      });
  }
  
  initialValue(){
      this.changeStatusInput.id = this.offer.id;
      this.changeStatusInput.porchaseOrderId = this.offer.porchaseOrderId;
      this.changeStatusInput.status = this.offer.status;
  }
  save(){
    this.statusIsRequired = this.offer.status == undefined ? true : false;
    if (
      !this.statusIsRequired
    ) {
      
      this.changeStatusInput.approveDate = this.approveDate.toISOString();
      this.saving = true;
      this.offerService
        .changeStatus(this.changeStatusInput)
        .pipe(
          finalize(() => {
            this.saving = false;
            
          })
        )
        .subscribe((result) => {
          this.notify.info(this.l("SavedSuccessfully"));
          this.router.navigate(["/app/orders/supplier-offers"]);
        });
    }
  }

  
}
