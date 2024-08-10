import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrRoutingModule } from './hr-routing.module';
import { HrComponent } from './hr.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/layout/layout.module';
import { QueryBuilderModule } from 'angular2-query-builder';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { EmployeeServiceProxy } from '@shared/service-proxies/service-proxies';
import { EmployeeComponent } from './employee/employee.component';
import { CreateEmployeeComponent } from './employee/create-employee/create-employee.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { ViewEmployeeComponent } from './employee/view-employee/view-employee.component';


@NgModule({
  declarations: [HrComponent, EmployeeComponent, CreateEmployeeComponent, EditEmployeeComponent, ViewEmployeeComponent],
  imports: [
    CommonModule,
    HrRoutingModule,
    AccordionModule.forRoot(),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    CommonModule,
    QueryBuilderModule,
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    EmployeeServiceProxy
  ]
})
export class HrModule {}
