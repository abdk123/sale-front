import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportViewerModule } from 'ngx-ssrs-reportviewer';
import { ReportsComponent } from './reports.component';
import { TotalMaterialBalanceComponent } from './total-material-balance/total-material-balance.component';
import { SharedModule } from '@shared/shared.module';
import { MaterialBalanceComponent } from './material-balance/material-balance.component';

@NgModule({
  declarations: [
    ReportsComponent,
    TotalMaterialBalanceComponent,
    MaterialBalanceComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    ReportViewerModule,
  ],
 
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class ReportsModule { }
