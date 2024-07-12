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
import { CategoryServiceProxy, CustomerServiceProxy, MaterialServiceProxy } from '@shared/service-proxies/service-proxies';


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
    FilterMaterialDialogComponent
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  providers:[
    MaterialServiceProxy,
    CategoryServiceProxy,
    CustomerServiceProxy,
  ]
})
export class SettingsModule { }
