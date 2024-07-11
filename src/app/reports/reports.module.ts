import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportViewerModule } from 'ngx-ssrs-reportviewer';
import { TestReportComponent } from './test-report/test-report.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    TestReportComponent
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
