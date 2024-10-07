import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from '@shared/app-component-base';
import { OfferDto, OfferServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'view-offer',
  templateUrl: './view-offer.component.html',
  styleUrls: ['./view-offer.component.scss']
})
export class ViewOfferComponent extends AppComponentBase implements OnInit {

  offer: OfferDto = new OfferDto();
  offerItemsIds: number[] = [];
  id:number;
  constructor(
    injector: Injector,
    private router: Router,
    private offerService: OfferServiceProxy,
    private route: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot?.params?.id;
    
    this.initialOffer();

  }

  initialOffer() {
    this.offerService.getOfferWithDetailId(this.id)
    .subscribe(result=>{
      this.offer = result;
      if(this.offer.offerItems?.length > 0){
        this.offerItemsIds = [];
        this.offer.offerItems.forEach(item=>{
          this.offerItemsIds.push(item.id);
        });
      }
      
    });
  }

}