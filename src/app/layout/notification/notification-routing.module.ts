import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {NotificationComponent} from './notification.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';

const routes: Routes = [{
  path: 'notifications', component: NotificationComponent ,
 

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
