import { HrModule } from './hr/hr.module';
import { CashFlowsModule } from './cash-flows/cash-flows.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
import {WidgetsModule} from './widgets/widgets.module';
import {LayoutModule} from './layout/layout.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HotkeyModule } from 'angular2-hotkeys';
import { ComponentsModule } from './@components/components.module';
import { SettingsModule } from './settings/settings.module';
import { SecurityModule } from './security/security.module';
import {NotificationModule} from './layout/notification/notification.module'
import { ReportsModule } from './reports/reports.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { VouchersModule } from './vouchers/vouchers.module';


@NgModule({
  declarations: [
    AppComponent,
    TenantsComponent,
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
    


  ],
  imports: [

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ModalModule.forChild(),
    BsDropdownModule,
    CollapseModule.forRoot(),
    PerfectScrollbarModule,
    TabsModule,
    PaginationModule.forRoot(),
    AppRoutingModule,
    ServiceProxyModule,
    HotkeyModule.forRoot(),
    SharedModule,
    NgxPaginationModule,
    AccordionModule.forRoot(),
    WidgetsModule,
    LayoutModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    // ContextMenuModule.forRoot({
    //   useBootstrap4: true,
    // }),
    ComponentsModule,
    NotificationModule,
    SettingsModule,
    SecurityModule,
    ReportsModule,
    PurchaseOrderModule,
    VouchersModule,
    CashFlowsModule,
    HrModule
  ],

  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  entryComponents: [
    CreateTenantDialogComponent,
    EditTenantDialogComponent,
  ],
providers:[
  DatePipe 
]
})
export class AppModule {}
