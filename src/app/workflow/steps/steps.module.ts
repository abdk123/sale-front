import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@app/layout/layout.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { StepsComponent } from './steps.component';
import { CreateStepsDialogComponent } from './create-steps/create-steps-dialog.component';
import { EditStepsDialogComponent } from './edit-steps/edit-steps-dialog.component';

@NgModule({
  declarations: [
    StepsComponent,
    CreateStepsDialogComponent,
    EditStepsDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LayoutModule,
    SharedModule,
  ]
})
export class StepsModule { }
