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
import { SendDeliveryComponent } from "./delivery/send-delivery/send-delivery.component";
import { SaleInvoiceComponent } from "./sale-invoice/sale-invoice.component";
import { ConvertSaleInvoiceComponent } from "./sale-invoice/convert-sale-invoice/convert-sale-invoice.component";
import { ManageDeliveryListComponent } from "./delivery/manage-delivery-list/manage-delivery-list.component";
import { DeliveryReportComponent } from "./delivery/manage-delivery-list/delivery-report/delivery-report.component";
import { MonitorPurchaseOrderComponent } from "./monitor-purchase-order/monitor-purchase-order.component";
import { ReturnedDeliveriesComponent } from "./returned-deliveries/returned-deliveries.component";
import { RejectedDeliveriesComponent } from "./rejected-deliveries/rejected-deliveries.component";
import { PdfUrnComponent } from "./sale-invoice/pdf-urn/pdf-urn.component";
import { ViewOfferComponent } from "./offer/view-offer/view-offer.component";
import { SupplierOfferComponent } from "./supplier-offer/supplier-offer.component";
import { CreateSupplierOfferComponent } from "./supplier-offer/create-supplier-offer/create-supplier-offer.component";

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
      {
        path: "supplier-offers",
        component: SupplierOfferComponent,
        //data: { permission: "Setting.Offers" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "create-supplier-offer",
        component: CreateSupplierOfferComponent,
        //data: { permission: "Setting.Offers.Create" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "summary",
        component: ViewOfferComponent,
        canActivate: [AppRouteGuard],
      },
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
      {
        path: "deliveries",
        component: DeliveryComponent,
        //data: { permission: "PurshaseOrder.Invoices.Update" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "send-delivery",
        component: SendDeliveryComponent,
        //data: { permission: "PurshaseOrder.Deliveries.Create" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "sale-invoices",
        component: SaleInvoiceComponent,
        //data: { permission: "PurshaseOrder.Invoices.Update" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "convert-sale-invoices",
        component: ConvertSaleInvoiceComponent,
        //data: { permission: "PurshaseOrder.Deliveries.Print" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "manage-delivery",
        component: ManageDeliveryListComponent,
        //data: { permission: "PurshaseOrder.Deliveries.Manage" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "delivery-report",
        component: DeliveryReportComponent,
        //data: { permission: "PurshaseOrder.Deliveries.AddDeliveryReport" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "monitor-po",
        component: MonitorPurchaseOrderComponent,
        //data: { permission: "PurshaseOrder.Deliveries." },
        canActivate: [AppRouteGuard],
      },
      {
        path: "rejected-deliveries",
        component: RejectedDeliveriesComponent,
        //data: { permission: "PurshaseOrder.Deliveries.AddDeliveryReport" },
        canActivate: [AppRouteGuard],
      },
      {
        path: "pdf-urn",
        component: PdfUrnComponent,
        //data: { permission: "PurshaseOrder.Deliveries.AddDeliveryReport" },
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
