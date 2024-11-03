import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseOrderComponent } from './purchase-order.component';
import { PurchaseOrderRoutingModule } from './purchase-order-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/layout/layout.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { QueryBuilderModule } from 'angular2-query-builder';
import { SharedModule } from '@shared/shared.module';
import { OfferComponent } from './offer/offer.component';
import { CustomerCashFlowServiceProxy, CustomerServiceProxy, DeliveryServiceProxy, InvoiceServiceProxy, MaterialServiceProxy, OfferServiceProxy, ReceivingServiceProxy, RejectDeliveryServiceProxy, SaleInvoiceServiceProxy, StockServiceProxy, SupplierOfferServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOfferComponent } from './offer/create-offer/create-offer.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CreateOfferItemComponent } from './offer/create-offer/create-offer-item/create-offer-item.component';
import { EditOfferComponent } from './offer/edit-offer/edit-offer.component';
import { EditOfferItemComponent } from './offer/edit-offer/eidt-offer-item/edit-offer-item.component';
import { ManageOfferComponent } from './offer/manage-offer/manage-offer.component';
import { ManageOfferItemComponent } from './offer/manage-offer/manage-offer-item/manage-offer-item.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { EditInvoiceComponent } from './invoice/edit-invoice/edit-invoice.component';
import { EditInvoiceItemComponent } from './invoice/edit-invoice/update-invoice-item/edit-invoice-item.component';
import { PrintOfferComponent } from './offer/print-offer/print-offer.component';
import { ReceivingComponent } from './receiving/receiving.component';
import { EditReceiveComponent } from './receiving/edit-receive/edit-receive.component';
import { EditReceiveItemComponent } from './receiving/edit-receive/edit-receive-item/edit-receive-item.component';
import { CreateReceiveComponent } from './receiving/create-receive/create-receive.component';
import { CreateReceiveItemComponent } from './receiving/create-receive/create-receive-item/create-receive-item.component';
import { ReceiveListComponent } from './receiving/receive-list/receive-list.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { SendDeliveryComponent } from './delivery/send-delivery/send-delivery.component';
import { SendDeliveryItemComponent } from './delivery/send-delivery/send-delivery-item/send-delivery-item.component';
import { PrintDeliveryComponent } from './delivery/print-delivery/print-delivery.component';
import { DeliveryListComponent } from './delivery/delivery-list/delivery-list.component';
import { ManageDeliveryListComponent } from './delivery/manage-delivery-list/manage-delivery-list.component';
import { SaleInvoiceComponent } from './sale-invoice/sale-invoice.component';
import { ConvertSaleInvoiceComponent } from './sale-invoice/convert-sale-invoice/convert-sale-invoice.component';
import { DeliveryReportComponent } from './delivery/manage-delivery-list/delivery-report/delivery-report.component';
import { DeliveryReportItemComponent } from './delivery/manage-delivery-list/delivery-report/delivery-report-item/delivery-report-item.component';
import { MonitorPurchaseOrderComponent } from './monitor-purchase-order/monitor-purchase-order.component';
import { PrintSaleInvoiceComponent } from './sale-invoice/print-sale-invoice/print-sale-invoice.component';
import { ReturnedDeliveriesComponent } from './returned-deliveries/returned-deliveries.component';
import { RejectedDeliveriesComponent } from './rejected-deliveries/rejected-deliveries.component';
import { PdfUrnComponent } from './sale-invoice/pdf-urn/pdf-urn.component';
import { RejectDialogComponent } from './delivery/manage-delivery-list/delivery-report/delivery-report-item/reject-dialog/reject-dialog.component';
import { ViewOfferComponent } from './offer/view-offer/view-offer.component';
import { ViewOfferSummaryComponent } from './offer/view-offer/view-offer-summary/view-offer-summary.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ViewOfferItemComponent } from './offer/view-offer/view-offer-item/view-offer-item.component';
import { ViewPorchaseInvoiceComponent } from './offer/view-offer/view-porchase-invoice/view-porchase-invoice.component';
import { ViewDeliveryComponent } from './offer/view-offer/view-delivery/view-delivery.component';
import { ViewSaleInvoiceComponent } from './offer/view-offer/view-sale-invoice/view-sale-invoice.component';
import { SupplierOfferComponent } from './supplier-offer/supplier-offer.component';
import { CreateSupplierOfferComponent } from './supplier-offer/create-supplier-offer/create-supplier-offer.component';
import { CreateSupplierOfferItemComponent } from './supplier-offer/create-supplier-offer/create-supplier-offer-item/create-supplier-offer-item.component';
import { UpdateSupplierOfferComponent } from './supplier-offer/update-supplier-offer/update-supplier-offer.component';
import { UpdateSupplierOfferItemComponent } from './supplier-offer/update-supplier-offer/update-supplier-offer-item/update-supplier-offer-item.component';
import { ManageSupplierOfferComponent } from './supplier-offer/manage-supplier-offer/manage-supplier-offer.component';
import { ManageSupplierOfferItemComponent } from './supplier-offer/manage-supplier-offer/manage-supplier-offer-item/manage-supplier-offer-item.component';
import { CreateInvoiceComponent } from './invoice/create-invoice/create-invoice.component';
import { CompleteReceiveComponent } from './receiving/complete-receive/complete-receive.component';

@NgModule({
  declarations: [
    PurchaseOrderComponent,
    OfferComponent,
    CreateOfferComponent,
    CreateOfferItemComponent,
    EditOfferComponent,
    EditOfferItemComponent,
    ManageOfferComponent,
    ManageOfferItemComponent,
    InvoiceComponent,
    EditInvoiceComponent,
    EditInvoiceItemComponent,
    // PrintOfferComponent,
    ReceivingComponent,
    EditReceiveComponent,
    EditReceiveItemComponent,
    CreateReceiveComponent,
    CreateReceiveItemComponent,
    ReceiveListComponent,
    DeliveryComponent,
    SendDeliveryComponent,
    SendDeliveryItemComponent,
    DeliveryListComponent,
    PrintDeliveryComponent,
    ManageDeliveryListComponent,
    SaleInvoiceComponent,
    ConvertSaleInvoiceComponent,
    DeliveryReportComponent,
    DeliveryReportItemComponent,
    MonitorPurchaseOrderComponent,
    PrintSaleInvoiceComponent,
    ViewSaleInvoiceComponent,
    ReturnedDeliveriesComponent,
    RejectedDeliveriesComponent,
    PdfUrnComponent,
    RejectDialogComponent,
    ViewOfferComponent,
    ViewOfferSummaryComponent,
    ViewOfferItemComponent,
    ViewPorchaseInvoiceComponent,
    ViewDeliveryComponent,
    SupplierOfferComponent,
    CreateSupplierOfferComponent,
    CreateSupplierOfferItemComponent,
    UpdateSupplierOfferComponent,
    UpdateSupplierOfferItemComponent,
    ManageSupplierOfferComponent,
    ManageSupplierOfferItemComponent,
    CreateInvoiceComponent,
    CompleteReceiveComponent
  ],
  imports: [
    AccordionModule.forRoot(),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    CommonModule,
    QueryBuilderModule,
    PurchaseOrderRoutingModule,
    NgSelectModule,
    BsDatepickerModule,
    TabsModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    OfferServiceProxy,
    CustomerServiceProxy,
    StockServiceProxy,
    MaterialServiceProxy,
    InvoiceServiceProxy,
    ReceivingServiceProxy,
    DeliveryServiceProxy,
    SaleInvoiceServiceProxy,
    RejectDeliveryServiceProxy,
    CustomerCashFlowServiceProxy,
    SupplierOfferServiceProxy 
  ],
})
export class PurchaseOrderModule {}
