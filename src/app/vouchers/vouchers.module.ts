import { PaginationModule } from 'ngx-bootstrap/pagination';
import { LayoutModule } from './../layout/layout.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SharedModule } from './../../shared/shared.module';
import { VouchersComponent } from './vouchers.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QueryBuilderModule } from 'angular2-query-builder';
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { VouchersRoutingModule } from "./vouchers-routing.module";
import { TransportCompanyVoucherComponent } from './transport-company-voucher/transport-company-voucher.component';
import { ClearanceCompanyVoucherComponent } from './clearance-company-voucher/clearance-company-voucher.component';
import { CreateTransportCompanyVoucherComponent } from './transport-company-voucher/create-transport-company-voucher/create-transport-company-voucher.component';
import { EditTransportCompanyVoucherComponent } from './transport-company-voucher/edit-transport-company-voucher/edit-transport-company-voucher.component';
import { ViewTransportCompanyVoucherComponent } from './transport-company-voucher/view-transport-company-voucher/view-transport-company-voucher.component';
import { ClearanceCompanyVoucherServiceProxy, TransportCompanyVoucherServiceProxy } from '@shared/service-proxies/service-proxies';
import { ViewClearanceCompanyVoucherComponent } from './clearance-company-voucher/view-clearance-company-voucher/view-clearance-company-voucher.component';
import { CreateClearanceCompanyVoucherComponent } from './clearance-company-voucher/create-clearance-company-voucher/create-clearance-company-voucher.component';
import { EditClearanceCompanyVoucherComponent } from './clearance-company-voucher/edit-clearance-company-voucher/edit-clearance-company-voucher.component';



@NgModule({
  declarations: [
    VouchersComponent,
    TransportCompanyVoucherComponent,
    ClearanceCompanyVoucherComponent,
    CreateTransportCompanyVoucherComponent,
    EditTransportCompanyVoucherComponent,
    ViewTransportCompanyVoucherComponent,
    ViewClearanceCompanyVoucherComponent,
    CreateClearanceCompanyVoucherComponent,
    EditClearanceCompanyVoucherComponent,
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
    VouchersRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    TransportCompanyVoucherServiceProxy,
    ClearanceCompanyVoucherServiceProxy,
  ],
})
export class VouchersModule {}
