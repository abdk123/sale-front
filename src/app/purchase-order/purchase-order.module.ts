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
import { CustomerServiceProxy, MaterialServiceProxy, OfferServiceProxy, StockServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOfferComponent } from './offer/create-offer/create-offer.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CreateOfferItemComponent } from './offer/create-offer/create-offer-item/create-offer-item.component';
import { EditOfferComponent } from './offer/edit-offer/edit-offer.component';
import { EditOfferItemComponent } from './offer/edit-offer/eidt-offer-item/edit-offer-item.component';
import { ManageOfferComponent } from './offer/manage-offer/manage-offer.component';
import { ManageOfferItemComponent } from './offer/manage-offer/manage-offer-item/manage-offer-item.component';

@NgModule({
  declarations: [
    PurchaseOrderComponent,
    OfferComponent,
    CreateOfferComponent,
    CreateOfferItemComponent,
    EditOfferComponent,
    EditOfferItemComponent,
    ManageOfferComponent,
    ManageOfferItemComponent,
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
    BsDatepickerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    OfferServiceProxy,
    CustomerServiceProxy,
    StockServiceProxy,
    MaterialServiceProxy,
  ],
})
export class PurchaseOrderModule {}
