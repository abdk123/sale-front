import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PurchaseOrderComponent } from "./purchase-order.component";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { OfferComponent } from "./offer/offer.component";
import { CreateOfferComponent } from "./offer/create-offer/create-offer.component";
import { EditOfferComponent } from "./offer/edit-offer/edit-offer.component";
import { ManageOfferComponent } from "./offer/manage-offer/manage-offer.component";
import { InvoiceComponent } from "./invoice/invoice.component";
import { EditInvoiceComponent } from "./invoice/edit-invoice/edit-invoice.component";
import { ReceivingComponent } from "./receiving/receiving.component";
import { DeliveryComponent } from "./delivery/delivery.component";
import { EditReceiveComponent } from "./receiving/edit-receive/edit-receive.component";
import { CreateReceiveComponent } from "./receiving/create-receive/create-receive.component";

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
      // {
      //   path: "print-offer",
      //   component: PrintOfferComponent,
      //   // data: { permission: "PurshaseOrder.Invoices.Update" },
      //   canActivate: [AppRouteGuard],
      // },
      {
        path: "invoices",
        component: InvoiceComponent,
        data: { permission: "PurshaseOrder.Invoices" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "edit-invoice",
        component: EditInvoiceComponent,
        data: { permission: "PurshaseOrder.Invoices.Update" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "receives",
        component: ReceivingComponent,
        data: { permission: "PurshaseOrder.Receivings" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "create-receive",
        component: CreateReceiveComponent,
        data: { permission: "PurshaseOrder.Receivings.Create" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "edit-receive",
        component: EditReceiveComponent,
        data: { permission: "PurshaseOrder.Receivings.Update" },
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
