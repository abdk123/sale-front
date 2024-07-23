import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CashFlowsComponent } from "./cash-flows.component";
import { ClearanceCompanyCashFlowComponent } from "./clearance-company-cash-flow/clearance-company-cash-flow.component";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { TransportCompanyCashFlowComponent } from "./transport-company-cash-flow/transport-company-cash-flow.component";
import { CustomerCashFlowComponent } from "./customer-cash-flow/customer-cash-flow.component";


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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashFlowsRoutingModule {}
