import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrintDeliveryComponent } from '@app/purchase-order/delivery/print-delivery/print-delivery.component';
import { PrintOfferComponent } from '@app/purchase-order/offer/print-offer/print-offer.component';
import { PrintSaleInvoiceComponent } from '@app/purchase-order/sale-invoice/print-sale-invoice/print-sale-invoice.component';

const routes: Routes = [
  {
    path: "print-offer",
    component: PrintOfferComponent,
  },
  {
    path: "print-delivery",
    component: PrintDeliveryComponent,
  },
  {
    path: "print-saleInvoice",
    component: PrintSaleInvoiceComponent,
  },
  { path: "", redirectTo: "/app/home", pathMatch: "full" },
  {
    path: "account",
    loadChildren: () =>
      import("account/account.module").then((m) => m.AccountModule), // Lazy load account module
    data: { preload: true },
  },
  {
    path: "app",
    loadChildren: () => import("app/app.module").then((m) => m.AppModule), // Lazy load account module
    data: { preload: true },
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})
export class RootRoutingModule { }
