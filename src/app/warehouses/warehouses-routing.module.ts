import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { WarehousesComponent } from './warehouses.component';
import { WarehouseMaterialComponent } from './warehouse-material/warehouse-material.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { OutputRequestComponent } from './output-request/output-request.component';
import { CreateOutputRequestDialogComponent } from './output-request/create-output-request/create-output-request-dialog.component';
import { EditOutputRequestDialogComponent } from './output-request/edit-output-request/edit-output-request-dialog.component';



const routes: Routes = [{
  path: '', component: WarehousesComponent ,
  children:[
    {
      path: 'warehouse',
      component: WarehouseComponent,

      data: { permission : 'Warehouses.Warehouses' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'warehouseMaterial',
      component: WarehouseMaterialComponent,

      data: { permission : 'Warehouses.WarehouseMaterials' },
      canActivate: [AppRouteGuard]
    },
        {
      path: 'outputRequest',
      component: OutputRequestComponent,

      data: { permission : 'Warehouses.OutputRquests' },
      canActivate: [AppRouteGuard]
    },

    {
      path: 'newOutputRequest',
      component: CreateOutputRequestDialogComponent,

      data: { permission : 'Warehouses.OutputRquests' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'editOutputRequest/:id',
      component: EditOutputRequestDialogComponent,

      data: { permission : 'Warehouses.OutputRquests' },
      canActivate: [AppRouteGuard]
    }







  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseRoutingModule { }
