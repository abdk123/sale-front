import { ArbitrageDialogComponent } from './actually/view-actually/actual-product/arbitrage-dialog/arbitrage-dialog.component';
import { ActuallyComponent } from './actually/actually.component';
import { LogsComponent } from './plan/view-plan/logs/logs.component';
import { PlanProductsPercentageComponent } from './plan/view-plan/plan-products/plan-products-percentage.component';
import { PlanMaterialComponent } from './plan/view-plan/plan-material/plan-material.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionComponent } from './production.component';
import { ProductionRoutingModule } from './production-routing.module';

import { SharedModule } from '@shared/shared.module';
import { LayoutModule } from '@app/layout/layout.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ChartsModule } from '@app/@components/charts/charts.module';
import {  BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PlanComponent } from './plan/plan.component';
import { CreatePlanDialogComponent } from './plan/create-plan/create-plan-dialog.component';
import { EditPlanDialogComponent } from './plan/edit-plan/edit-plan-dialog.component';
import { PlanProductComponent } from './plan/view-plan/plan-product/plan-product.component';
import { ViewPlanComponent } from './plan/view-plan/view-plan.component';
import { CreatePlanProductDialogComponent } from './plan/create-plan-product/create-plan-product-dialog.component';
import { EditPlanProductDialogComponent } from './plan/edit-plan-product/edit-plan-product-dialog.component';
import { LastLoginsComponent } from './plan/view-plan/last-logins/last-logins.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CreateActuallyDialogComponent } from './actually/create-actually/create-actually-dialog.component';
import { EditActuallyDialogComponent } from './actually/edit-actually/edit-actually-dialog.component';
import { ViewActuallyComponent } from './actually/view-actually/view-actually.component';
import { ActualMaterialComponent } from './actually/view-actually/actual-material/actual-material.component';
import { ActualProductComponent } from './actually/view-actually/actual-product/actual-product.component';
import { ActualDetailDialogComponent } from './actually/view-actually/actual-detail-dialog/actual-detail-dialog.component';
import { ConfirmationDialogComponent } from './actually/confirmation-dialog/confirmation-dialog.component';
import { DailyProductionDoughnutComponent } from './actually/view-actually/actual-product/daily-production-doughnut/daily-production-doughnut.component';
import { FilterPlanDialogComponent } from './plan/filter-plan/filter-plan-dialog.component';
import { QueryBuilderModule } from 'angular2-query-builder';
import { FilterActuallyDialogComponent } from './actually/filter-actually/filter-actually-dialog.component';
@NgModule({
  declarations: [
    ProductionComponent,
    PlanComponent,
    CreatePlanDialogComponent,
    EditPlanDialogComponent,
    PlanProductComponent,
    CreatePlanProductDialogComponent,
    EditPlanProductDialogComponent,
    ViewPlanComponent,
    PlanMaterialComponent,
    PlanProductsPercentageComponent,
    LogsComponent,
    LastLoginsComponent,
    ActuallyComponent,
    CreateActuallyDialogComponent,
    EditActuallyDialogComponent,
    ViewActuallyComponent,
    ActualMaterialComponent,
    ActualProductComponent,
    ArbitrageDialogComponent,
    ActualDetailDialogComponent,
    ConfirmationDialogComponent,
    DailyProductionDoughnutComponent,
    FilterPlanDialogComponent,
    FilterActuallyDialogComponent,

  ],
  imports: [
    ProductionRoutingModule,
    CommonModule,
    SharedModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule,
    BsDatepickerModule.forRoot(),
    QueryBuilderModule,


  ],

  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class ProductionModule { }
