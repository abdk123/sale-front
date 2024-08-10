import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HrComponent } from './hr.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { EmployeeComponent } from './employee/employee.component';

const routes: Routes = [
  {
    path: "",
    component: HrComponent,
    children: [
      {
        path: "employees",
        component: EmployeeComponent,
        //data: { permission: "Setting.Customers" },
        canActivate: [AppRouteGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
