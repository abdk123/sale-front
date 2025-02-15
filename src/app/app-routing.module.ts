import { LayoutModule } from '@app/layout/layout.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { TenantsComponent } from './tenants/tenants.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        component: AppComponent,
        children: [
          {
            path: "home",
            component: HomeComponent,
            canActivate: [AppRouteGuard],
          },
          {
            path: "tenants",
            component: TenantsComponent,
            data: { permission: "Pages.Tenants" },
            canActivate: [AppRouteGuard],
          },
          {
            path: "settings",
            loadChildren: () =>
              import("./settings/settings.module").then(
                (m) => m.SettingsModule
              ),
          },
          {
            path: "hr",
            loadChildren: () =>
              import("./hr/hr.module").then(
                (m) => m.HrModule
              ),
          },
          {
            path: "security",
            loadChildren: () =>
              import("./security/security.module").then(
                (m) => m.SecurityModule
              ),
          },
          {
            path: "orders",
            loadChildren: () =>
              import("./purchase-order/purchase-order.module").then(
                (m) => m.PurchaseOrderModule
              ),
          },
          {
            path: "vouchers",
            loadChildren: () =>
              import("./vouchers/vouchers.module").then(
                (m) => m.VouchersModule
              ),
          },
          {
            path: "cash-flows",
            loadChildren: () =>
              import("./cash-flows/cash-flows.module").then(
                (m) => m.CashFlowsModule
              ),
          },
          {
            path: "notifications",
            loadChildren: () =>
              import("../app/layout/notification/notification.module").then(
                (m) => m.NotificationModule
              ),
          },
          {
            path: "reports",
            loadChildren: () =>
              import("../app/reports/reports.module").then(
                (m) => m.ReportsModule
              ),
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
