import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseMaterialComponent } from './warehouse-material.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/layout/layout.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FilterWarehouseMaterialDialogComponent } from './filter-warehouse-material/filter-warehouse-material-dialog.component';
import { ViewWarehouseMaterialDialogComponent } from './view-warehouse-material/view-warehouse-material-dialog.component';
import { EditWarehouseMaterialDialogComponent } from './edit-warehouse-material/edit-warehouse-material-dialog.component';
import { CreateWarehouseMaterialDialogComponent } from './create-warehouse-material/create-warehouse-material-dialog.component';
import { QueryBuilderModule } from 'angular2-query-builder';



@NgModule({
  declarations: [
    WarehouseMaterialComponent,
    ViewWarehouseMaterialDialogComponent,
    EditWarehouseMaterialDialogComponent,
    CreateWarehouseMaterialDialogComponent,
    FilterWarehouseMaterialDialogComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    QueryBuilderModule,
    FormsModule,
    LayoutModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    BsDatepickerModule,

  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class WarehouseMaterialModule { }
