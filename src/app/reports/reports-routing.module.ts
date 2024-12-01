import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { TotalMaterialBalanceComponent } from './total-material-balance/total-material-balance.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { MaterialBalanceComponent } from './material-balance/material-balance.component';


const routes: Routes = [{
  path: '', component: ReportsComponent,
  children: [
    {
      path: "materials-balances",
      component: TotalMaterialBalanceComponent,
      //data: { permission: "Setting.TotalMaterialBalances" },
      canActivate: [AppRouteGuard],
    },
    {
      path: "material-balance",
      component: MaterialBalanceComponent,
      //data: { permission: "Setting.MaterialBalances" },
      canActivate: [AppRouteGuard],
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
