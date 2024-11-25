import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { ChangeOfferStatusDto, OfferDto, OfferServiceProxy } from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs';

@Component({
  selector: 'manage-offer',
  templateUrl: './manage-offer.component.html',
  styleUrls: ['./manage-offer.component.scss']
})
export class ManageOfferComponent extends AppComponentBase implements OnInit {
  offer: OfferDto = new OfferDto();
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
    private _router: Router,
    
    private offerService: OfferServiceProxy,
    private _route: ActivatedRoute
  ) {
    super(injector);
  }
  ngOnInit(): void {
    
    this.id = this._route.snapshot?.params?.id;
    this.initialOffer();
  }
  
  

  initialOffer() {
    this.offerService
      .getOfferWithDetailId(this.id)
      .subscribe((result: OfferDto) => {
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
            //this._router.navigate(["/app/orders/offers"]);
        });
    }
  }

  
}
