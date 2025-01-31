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
import { StoreComponent } from "./store/store.component";
import { ClearanceCompanyComponent } from "./clearance-company/clearance-company.component";
import { TransportCompanyComponent } from "./transport-company/transport-company.component";
import { CreateMaterialDialogComponent } from "./material/create-material/create-material-dialog.component";
import { EditMaterialDialogComponent } from "./material/edit-material/edit-material-dialog.component";
import { GeneralSettingComponent } from "./general-setting/general-setting.component";
import { ViewMaterialDialogComponent } from "./material/view-material/view-material-dialog.component";

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
        path: "create-material",
        component: CreateMaterialDialogComponent,

        //data: { permission: "Setting.Materials" },
        canActivate: [AppRouteGuard],
      },

      {
        path: "update-material",
        component: EditMaterialDialogComponent,

        //data: { permission: "Setting.Materials" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "view-material",
        component: ViewMaterialDialogComponent,
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

      {
        path: "store",
        component: StoreComponent,
        //data: { permission: "Setting.Categories" },
        canActivate: [AppRouteGuard],
      },

      {
        path: "clearanceCompany",
        component: ClearanceCompanyComponent,
        //data: { permission: "Setting.Categories" },
        canActivate: [AppRouteGuard],
      },

      {
        path: "transportCompany",
        component: TransportCompanyComponent,
        //data: { permission: "Setting.Categories" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "generalSetting",
        component: GeneralSettingComponent,
        //data: { permission: "Setting.GeneralSettings" },
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
