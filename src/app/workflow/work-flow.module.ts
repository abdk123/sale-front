import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkFlowComponent } from './work-flow.component';
import { WorkFlowRoutingModule } from './work-flow-routing.module';
import { LayoutModule } from '@app/layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { CreateWorkflowDialogComponent } from './create-workflow/create-workflow-dialog.component';
import { StepsModule } from './steps/steps.module';
import { FormsModule } from '@angular/forms';
import { EditWorkflowDialogComponent } from './edit-workflow/edit-workflow-dialog.component';
import { ViewWorkflowDialogComponent } from './view-workflow/view-workflow-dialog.component';
import { FilterWorkflowDialogComponent } from './filter-workflow/filter-workflow-dialog.component';
import { QueryBuilderModule } from 'angular2-query-builder';


@NgModule({
  declarations: [
    WorkFlowComponent,
    CreateWorkflowDialogComponent,
    EditWorkflowDialogComponent,
    ViewWorkflowDialogComponent,
    FilterWorkflowDialogComponent,



  ],
  imports: [
    CommonModule,
    FormsModule,
    QueryBuilderModule,
    LayoutModule,
    SharedModule,
    WorkFlowRoutingModule,
    StepsModule
  ]
})
export class WorkFlowModule { }
