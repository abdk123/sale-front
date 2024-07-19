import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PurchaseOrderComponent } from "./purchase-order.component";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { OfferComponent } from "./offer/offer.component";
import { CreateOfferComponent } from "./offer/create-offer/create-offer.component";
import { EditOfferComponent } from "./offer/edit-offer/edit-offer.component";
import { ManageOfferComponent } from "./offer/manage-offer/manage-offer.component";

const routes: Routes = [
  {
    path: "",
    component: PurchaseOrderComponent,
    children: [
      {
        path: "offers",
        component: OfferComponent,
        data: { permission: "Setting.Offers" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "create-offer",
        component: CreateOfferComponent,
        data: { permission: "Setting.Offers.Create" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "update-offer",
        component: EditOfferComponent,
        data: { permission: "Setting.Offers.Update" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "manage-offer",
        component: ManageOfferComponent,
        data: { permission: "Setting.Offers.Update" },
        canActivate: [AppRouteGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseOrderRoutingModule {}
