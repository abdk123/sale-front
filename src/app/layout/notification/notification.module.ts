import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotificationRoutingModule} from './notification-routing.module'
import { ContentTemplateModule } from '../content-template/content-template.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    ContentTemplateModule
  ]
})
export class NotificationModule { }
