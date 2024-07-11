import { SupplierComponent } from './supplier/supplier.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { UnitComponent } from './unit/unit.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { TransferComponent } from './Transfer/transfer.component';
import { GeneralSettingComponent } from './general-setting/general-setting.component';
import { CreateProductDialogComponent } from './product/create-product/create-product-dialog.component';
import { EditProductDialogComponent } from './product/edit-product/edit-product-dialog.component';
import { ProductComponent } from './product/product.component';
import { MaterialComponent } from './material/material.component';
import { FormulaComponent } from './formula/formula.component';
import { NotificationComponent } from '@app/layout/notification/notification.component';
import {  StepIndexComponent } from './workflow/StepIndex/stepIndex.component';
import { CategoryComponent } from './category/category.component';



const routes: Routes = [{
  path: '', component: SettingsComponent,
  children: [
    {
      path: 'supplier',
      component: SupplierComponent,

      data: { permission : 'Setting.Suppliers' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'product',
      component: ProductComponent,

      data: { permission : 'Setting.Products' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'unit',
      component: UnitComponent,

      data: { permission : 'Setting.Units' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'transfer',
      component: TransferComponent,

      data: { permission : 'Setting.Transfers' },
      canActivate: [AppRouteGuard]
    }
    ,
    {
      path: 'generalsetting',
      component: GeneralSettingComponent,

      data: { permission : 'Setting.GeneralSettings' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'material',
      component: MaterialComponent,

      data: { permission : 'Setting.Materials' },
      canActivate: [AppRouteGuard]
    },

    {
      path: 'formula/:id',
      component: FormulaComponent,

      //data: { permission : 'Pages.Products' },
      canActivate: [AppRouteGuard]
    },

    {
      path: 'newproduct',
      component: CreateProductDialogComponent,

      //data: { permission : 'Pages.Products' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'editproduct/:id',
      component: EditProductDialogComponent,

      //data: { permission : 'Pages.Products' },
      canActivate: [AppRouteGuard]
    },
    {
      path: 'notifications', component: NotificationComponent ,
      canActivate: [AppRouteGuard]
    }
    ,
    {
      path: 'WorkFlowStepIndex', component: StepIndexComponent ,
      canActivate: [AppRouteGuard]
    }
    ,
    {
      path: 'Category', component: CategoryComponent ,
      data: { permission : 'Setting.Categories' },
      canActivate: [AppRouteGuard]
    }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
