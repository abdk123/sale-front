import { VouchersComponent } from './vouchers.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TransportCompanyVoucherComponent } from './transport-company-voucher/transport-company-voucher.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { ClearanceCompanyVoucherComponent } from './clearance-company-voucher/clearance-company-voucher.component';

const routes: Routes = [
  {
    path: "",
    component: VouchersComponent,
    children: [
      {
        path: "transportCompanyVoucher",
        component: TransportCompanyVoucherComponent,
        //data: { permission: "Setting.Categories" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "clearanceCompanyVoucher",
        component: ClearanceCompanyVoucherComponent,
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
