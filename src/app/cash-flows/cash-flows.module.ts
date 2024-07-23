import { CashFlowsRoutingModule } from "./cash-flows-routing.module";
import { CashFlowsComponent } from "./cash-flows.component";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LayoutModule } from "@app/layout/layout.module";
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "@shared/shared.module";
import { QueryBuilderModule } from "angular2-query-builder";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CustomerCashFlowComponent } from "./customer-cash-flow/customer-cash-flow.component";
import { TransportCompanyCashFlowComponent } from "./transport-company-cash-flow/transport-company-cash-flow.component";
import { ClearanceCompanyCashFlowComponent } from "./clearance-company-cash-flow/clearance-company-cash-flow.component";
import { ClearanceCompanyCashFlowServiceProxy, CustomerCashFlowServiceProxy, TransportCompanyCashFlowServiceProxy } from "@shared/service-proxies/service-proxies";

@NgModule({
  declarations: [
    CashFlowsComponent,
    CustomerCashFlowComponent,
    TransportCompanyCashFlowComponent,
    ClearanceCompanyCashFlowComponent,
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
    CashFlowsRoutingModule,
    NgSelectModule,
    BsDatepickerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    ClearanceCompanyCashFlowServiceProxy,
    TransportCompanyCashFlowServiceProxy,
    CustomerCashFlowServiceProxy,
  ],
})
export class CashFlowsModule {}
