import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseOrderComponent } from './purchase-order.component';
import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/layout/layout.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { QueryBuilderModule } from 'angular2-query-builder';
import { SharedModule } from '@shared/shared.module';
import { OfferComponent } from './offer/offer.component';
import { CustomerServiceProxy, OfferServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOfferComponent } from './offer/create-offer/create-offer.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    PurchaseOrderComponent,
    OfferComponent,
    CreateOfferComponent,
    
  ],
  imports: [
  AccordionModule.forRoot(),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    CommonModule,
    QueryBuilderModule,
    PurchaseOrderRoutingModule,
    NgSelectModule,
    BsDatepickerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  providers:[
    OfferServiceProxy,
    CustomerServiceProxy
  ]
})
export class PurchaseOrderModule { }
