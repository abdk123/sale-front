import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CashFlowsComponent } from "./cash-flows.component";
import { ClearanceCompanyCashFlowComponent } from "./clearance-company-cash-flow/clearance-company-cash-flow.component";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { TransportCompanyCashFlowComponent } from "./transport-company-cash-flow/transport-company-cash-flow.component";
import { CustomerCashFlowComponent } from "./customer-cash-flow/customer-cash-flow.component";
import { TotalCustomerCashFlowComponent } from "./total-customer-cash-flow/total-customer-cash-flow.component";
import { TotalClearanceCashFlowComponent } from "./total-clearance-cash-flow/total-clearance-cash-flow.component";
import { TotalTransportCashFlowComponent } from "./total-transport-cash-flow/total-transport-cash-flow.component";


const routes: Routes = [
  {
    path: "",
    component: CashFlowsComponent,
    children: [
      {
        path: "clearance-company-cash-flows",
        component: ClearanceCompanyCashFlowComponent,
        //data: { permission: "Setting.Customers" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "transport-company-cash-flows",
        component: TransportCompanyCashFlowComponent,
        //data: { permission: "Setting.Customers" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "customer-cash-flows",
        component: CustomerCashFlowComponent,
        //data: { permission: "Setting.Customers" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "total-customer-cash-flows",
        component: TotalCustomerCashFlowComponent,
        //data: { permission: "Setting.Customers" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "total-clearance-cash-flows",
        component: TotalClearanceCashFlowComponent,
        //data: { permission: "Setting.Customers" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "total-transport-cash-flows",
        component: TotalTransportCashFlowComponent,
        //data: { permission: "Setting.Customers" },
        canActivate: [AppRouteGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashFlowsRoutingModule {}
