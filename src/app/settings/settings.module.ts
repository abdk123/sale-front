import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { UnitComponent } from './unit/unit.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { CreateUnitDialogComponent } from './unit/create-unit/create-unit-dialog.component';
import { EditUnitDialogComponent } from './unit/edit-unit/edit-unit-dialog.component';
import { ViewUnitDialogComponent } from './unit/view-unit/view-unit-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/layout/layout.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MaterialComponent } from './material/material.component';
import { CreateMaterialDialogComponent } from './material/create-material/create-material-dialog.component';
import { EditMaterialDialogComponent } from './material/edit-material/edit-material-dialog.component';
import { ViewMaterialDialogComponent } from './material/view-material/view-material-dialog.component';
import { CustomerComponent } from './customer/customer.component';
import { CreateCustomerDialogComponent } from './customer/create-customer/create-customer-dialog.component';
import { EditCustomerDialogComponent } from './customer/edit-customer/edit-customer-dialog.component';
import { ViewCustomerDialogComponent } from './customer/view-customer/view-customer-dialog.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { QueryBuilderModule } from 'angular2-query-builder';
import { FilterUnitDialogComponent } from './unit/filter-unit/filter-unit-dialog.component';
import { FilterCustomerDialogComponent } from './customer/filter-customer/filter-customer-dialog.component';
import { CreateCategoryDialogComponent } from './category/create-category/create-category-dialog.component';
import { EditCategoryDialogComponent } from './category/edit-category/edit-category-dialog.component';
import { ViewCategoryDialogComponent } from './category/view-category/view-category-dialog.component';
import { CategoryComponent } from './category/category.component';
import { FilterCategoryDialogComponent } from './category/filter-category/filter-category-dialog.component';
import { SharedModule } from '@shared/shared.module';
import { FilterMaterialDialogComponent } from './material/filter-material/filter-material-dialog.component';
import { CategoryServiceProxy, ClearanceCompanyServiceProxy, CustomerServiceProxy, MaterialServiceProxy, MigrationServiceProxy, SizeServiceProxy, StockServiceProxy, StoreServiceProxy, TransportCompanyServiceProxy } from '@shared/service-proxies/service-proxies';
import { StoreComponent } from './store/store.component';
import { CreateStoreComponent } from './store/create-store/create-store.component';
import { EditStoreComponent } from './store/edit-store/edit-store.component';
import { ViewStoreComponent } from './store/view-store/view-store.component';
import { ClearanceCompanyComponent } from './clearance-company/clearance-company.component';
import { TransportCompanyComponent } from './transport-company/transport-company.component';
import { CreateClearanceCompanyComponent } from './clearance-company/create-clearance-company/create-clearance-company.component';
import { EditClearanceCompanyComponent } from './clearance-company/edit-clearance-company/edit-clearance-company.component';
import { ViewClearanceCompanyComponent } from './clearance-company/view-clearance-company/view-clearance-company.component';
import { ViewTransportCompanyComponent } from './transport-company/view-transport-company/view-transport-company.component';
import { CreateTransportCompanyComponent } from './transport-company/create-transport-company/create-transport-company.component';
import { EditTransportCompanyComponent } from './transport-company/edit-transport-company/edit-transport-company.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { GeneralSettingComponent } from './general-setting/general-setting.component';


@NgModule({
  declarations: [
    SettingsComponent,
    UnitComponent,
    CreateUnitDialogComponent,
    EditUnitDialogComponent,
    ViewUnitDialogComponent,
    MaterialComponent,
    CreateMaterialDialogComponent,
    EditMaterialDialogComponent,
    ViewMaterialDialogComponent,
    CustomerComponent,
    CreateCustomerDialogComponent,
    EditCustomerDialogComponent,
    ViewCustomerDialogComponent,
    FilterUnitDialogComponent,
    FilterCustomerDialogComponent,
    CreateCategoryDialogComponent,
    EditCategoryDialogComponent,
    ViewCategoryDialogComponent,
    CategoryComponent,
    FilterCategoryDialogComponent,
    FilterMaterialDialogComponent,
    StoreComponent,
    CreateStoreComponent,
    EditStoreComponent,
    ViewStoreComponent,
    ClearanceCompanyComponent,
    TransportCompanyComponent,
    CreateClearanceCompanyComponent,
    EditClearanceCompanyComponent,
    ViewClearanceCompanyComponent,
    ViewTransportCompanyComponent,
    CreateTransportCompanyComponent,
    EditTransportCompanyComponent,
    GeneralSettingComponent,
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
    SettingsRoutingModule,
    BsDatepickerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    MaterialServiceProxy,
    CategoryServiceProxy,
    CustomerServiceProxy,
    StoreServiceProxy,
    ClearanceCompanyServiceProxy,
    TransportCompanyServiceProxy,
    SizeServiceProxy,
    StockServiceProxy,
    MigrationServiceProxy
  ],
})
export class SettingsModule {}
