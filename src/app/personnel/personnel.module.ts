import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PersonnelRoutingModule } from './personnel-routing.module';
import { PersonnelComponent } from './personnel.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@app/layout/layout.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { EmployeeComponent } from './employee/employee.component';
import { ChartsModule } from '@app/@components/charts/charts.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EmployeeServiceProxy, NationalityServiceProxy } from '@shared/service-proxies/service-proxies';
import { FilterEmployeeDialogComponent } from './employee/filter-employee/filter-employee-dialog.component';
import { QueryBuilderModule } from 'angular2-query-builder';
import { ChildrenComponent } from './employee/children/children.component';
import { CreateEmployeeDialogComponent } from './employee/create-employee/create-employee-dialog.component';
import { EditEmployeeDialogComponent } from './employee/edit-employee/edit-employee-dialog.component';
import { CreateChildDialogComponent } from './employee/children/create-child/create-child-dialog.component';
import { EditChildDialogComponent } from './employee/children/edit-child/edit-child-dialog.component';

@NgModule({
  declarations: [
    PersonnelComponent,
    EmployeeComponent,
    FilterEmployeeDialogComponent,
    ChildrenComponent,
    CreateEmployeeDialogComponent,
    EditEmployeeDialogComponent,
    CreateChildDialogComponent,
    EditChildDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    QueryBuilderModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PersonnelRoutingModule,

  ],


  providers:[
    EmployeeServiceProxy,
    NationalityServiceProxy,
    DatePipe
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class PersonnelModule { }
