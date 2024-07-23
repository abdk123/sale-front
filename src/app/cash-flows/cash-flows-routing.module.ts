import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CashFlowsComponent } from "./cash-flows.component";
import { ClearanceCompanyCashFlowComponent } from "./clearance-company-cash-flow/clearance-company-cash-flow.component";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";


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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashFlowsRoutingModule {}
