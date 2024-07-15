import { VouchersComponent } from './vouchers.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TransportCompanyVoucherComponent } from './transport-company-voucher/transport-company-voucher.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { ClearanceCompanyVoucherComponent } from './clearance-company-voucher/clearance-company-voucher.component';
import { CustomerVoucherComponent } from './customer-voucher/customer-voucher.component';

const routes: Routes = [
  {
    path: "",
    component: VouchersComponent,
    children: [
      {
        path: "transport-company-voucher",
        component: TransportCompanyVoucherComponent,
        //data: { permission: "Setting.Categories" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "clearance-company-voucher",
        component: ClearanceCompanyVoucherComponent,
        //data: { permission: "Setting.Categories" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "customer-voucher",
        component: CustomerVoucherComponent,
        //data: { permission: "Setting.Categories" },
        canActivate: [AppRouteGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VouchersRoutingModule {}
