import { AddNewTodoModalComponent } from './add-new-todo-modal/add-new-todo-modal.component';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPageHeaderComponent } from './list-page-header/list-page-header.component';
import { HeadingComponent } from './heading/heading.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ApplicationMenuComponent } from './application-menu/application-menu.component';
import { SharedModule } from '@shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PageHeaderComponent } from './page-header/page-header.component';
import { PageGridComponent } from './page-grid/page-grid.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    ListPageHeaderComponent,
    HeadingComponent,
    ApplicationMenuComponent,
    BreadcrumbComponent,
    PageHeaderComponent,
    PageGridComponent,
    AddNewTodoModalComponent,
  ],
  imports: [
    CommonModule,
    // PerfectScrollbarModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    SharedModule
  ],
  exports:[
    ListPageHeaderComponent,
    PageHeaderComponent,
    HeadingComponent,
    PageGridComponent,
    ApplicationMenuComponent,
    BreadcrumbComponent,
    AddNewTodoModalComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
})
export class ContentTemplateModule { }
