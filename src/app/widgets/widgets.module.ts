//import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StateButtonComponent } from './state-button/state-button.component';
//import { TwoListDragAndDropComponent } from './two-lists-drag-and-drop/two_list_drag_and_drop.component';
import { SharedModule } from '@shared/shared.module';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [
    StateButtonComponent,
    //TwoListDragAndDropComponent
  ],
  imports: [
    CommonModule,
    //DragDropModule,
    FormsModule,
    SharedModule,
    PerfectScrollbarModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  exports: [
    PerfectScrollbarModule,
    StateButtonComponent,
    //TwoListDragAndDropComponent
  ]
})
export class WidgetsModule { }
