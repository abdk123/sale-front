import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepIndexComponent } from './StepIndex/stepIndex.component';
import { LayoutModule } from '@app/layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { CreateStepIndexDialogComponent } from './StepIndex/create-step-index/create-step-Index-dialog.component';
import { EditStepIndexDialogComponent } from './StepIndex/edit-step-index/edit-step-Index-dialog.component';
import { FilterStepIndexDialogComponent } from './StepIndex/filter-step-index/filter-step-Index-dialog.component';
import { QueryBuilderModule } from 'angular2-query-builder';
import { ViewStepIndexDialogComponent } from './StepIndex/view-step-index/view-step-Index-dialog.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';



@NgModule({
  declarations: [
    StepIndexComponent,
    CreateStepIndexDialogComponent,
    EditStepIndexDialogComponent,
    FilterStepIndexDialogComponent,
    ViewStepIndexDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    QueryBuilderModule,
    PaginationModule.forRoot(),
  ]
})
export class WorkflowModule { }
