import { CustomerComponent } from "./customer/customer.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { SettingsComponent } from "./settings.component";
import { UnitComponent } from "./unit/unit.component";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { MaterialComponent } from "./material/material.component";
import { NotificationComponent } from "@app/layout/notification/notification.component";
import { CategoryComponent } from "./category/category.component";

const routes: Routes = [
  {
    path: "",
    component: SettingsComponent,
    children: [
      {
        path: "customer",
        component: CustomerComponent,

        //data: { permission: "Setting.Customers" },
        canActivate: [AppRouteGuard],
      },

      {
        path: "unit",
        component: UnitComponent,

        //data: { permission: "Setting.Units" },
        canActivate: [AppRouteGuard],
      },

      {
        path: "material",
        component: MaterialComponent,

        //data: { permission: "Setting.Materials" },
        canActivate: [AppRouteGuard],
      },

      {
        path: "notifications",
        component: NotificationComponent,
        canActivate: [AppRouteGuard],
      },

      {
        path: "category",
        component: CategoryComponent,
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
export class SettingsRoutingModule {}
