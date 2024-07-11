import { ProductComponent } from './product/product.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { UnitComponent } from './unit/unit.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { CreateUnitDialogComponent } from './unit/create-unit/create-unit-dialog.component';
import { EditUnitDialogComponent } from './unit/edit-unit/edit-unit-dialog.component';
import { ViewUnitDialogComponent } from './unit/view-unit/view-unit-dialog.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/layout/layout.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TransferComponent } from './Transfer/transfer.component';
import { ViewTransferDialogComponent } from './Transfer/view-transfer/view-transfer-dialog.component';
import { EditTransferDialogComponent } from './Transfer/edit-transfer/edit-transfer-dialog.component';
import { CreateTransferDialogComponent } from './Transfer/create-transfer/create-transfer-dialog.component';
import { GeneralSettingComponent } from './general-setting/general-setting.component';
import { CreateProductDialogComponent } from './product/create-product/create-product-dialog.component';
import { EditProductDialogComponent } from './product/edit-product/edit-product-dialog.component';
import { ViewProductDialogComponent } from './product/view-product/view-product-dialog.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { MaterialComponent } from './material/material.component';
import { CreateMaterialDialogComponent } from './material/create-material/create-material-dialog.component';
import { EditMaterialDialogComponent } from './material/edit-material/edit-material-dialog.component';
import { ViewMaterialDialogComponent } from './material/view-material/view-material-dialog.component';
import { FormulaComponent } from './formula/formula.component';
import { CreateFormulaDialogComponent } from './formula/create-formula/create-formula-dialog.component';
import { EditFormulaDialogComponent } from './formula/edit-formula/edit-formula-dialog.component';
import { ViewFormulaDialogComponent } from './formula/view-formula/view-formula-dialog.component';
import { MaterialDetailsComponent } from './material/material-details/material-details.component';
import { SupplierComponent } from './supplier/supplier.component';
import { CreateSupplierDialogComponent } from './supplier/create-supplier/create-supplier-dialog.component';
import { EditSupplierDialogComponent } from './supplier/edit-supplier/edit-supplier-dialog.component';
import { ViewSupplierDialogComponent } from './supplier/view-supplier/view-supplier-dialog.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { QueryBuilderModule } from 'angular2-query-builder';
import { FilterUnitDialogComponent } from './unit/filter-unit/filter-unit-dialog.component';
import { FilterTransferDialogComponent } from './Transfer/filter-transfer/filter-transfer-dialog.component';
import { FilterSupplierDialogComponent } from './supplier/filter-supplier/filter-supplier-dialog.component';
import { FilterProductDialogComponent } from './product/filter-product/filter-product-dialog.component';
import { FilterMaterialDialogComponent } from './material/filter-material/filter-material-dialog.component';
import { WorkflowModule } from './workflow/workflow.module';
import { CreateCategoryDialogComponent } from './category/create-category/create-category-dialog.component';
import { EditCategoryDialogComponent } from './category/edit-category/edit-category-dialog.component';
import { ViewCategoryDialogComponent } from './category/view-category/view-category-dialog.component';
import { CategoryComponent } from './category/category.component';
import { FilterCategoryDialogComponent } from './category/filter-category/filter-category-dialog.component';


@NgModule({
  declarations: [
    SettingsComponent,
    UnitComponent,
    CreateUnitDialogComponent,
    EditUnitDialogComponent,
    ViewUnitDialogComponent,
    TransferComponent,
    ViewTransferDialogComponent,
    EditTransferDialogComponent,
    ProductComponent,
    CreateProductDialogComponent,
    EditProductDialogComponent,
    ViewProductDialogComponent,
    CreateTransferDialogComponent,
    GeneralSettingComponent,
    MaterialComponent,
    CreateMaterialDialogComponent,
    EditMaterialDialogComponent,
    ViewMaterialDialogComponent,
    FormulaComponent,
    CreateFormulaDialogComponent,
    EditFormulaDialogComponent,
    ViewFormulaDialogComponent,
    MaterialDetailsComponent,
    SupplierComponent,
    CreateSupplierDialogComponent,
    EditSupplierDialogComponent,
    ViewSupplierDialogComponent,
    FilterUnitDialogComponent,
    FilterTransferDialogComponent,
    FilterSupplierDialogComponent,
    FilterProductDialogComponent,
    FilterMaterialDialogComponent,
    CreateCategoryDialogComponent,
    EditCategoryDialogComponent,
    ViewCategoryDialogComponent,
    CategoryComponent,
    FilterCategoryDialogComponent
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
    WorkflowModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class SettingsModule { }
