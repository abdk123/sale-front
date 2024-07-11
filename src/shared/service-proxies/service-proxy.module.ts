import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AbpHttpInterceptor } from 'abp-ng2-module';

import * as ApiServiceProxies from './service-proxies';

@NgModule({
    providers: [
        ApiServiceProxies.RoleServiceProxy,
        ApiServiceProxies.SessionServiceProxy,
        ApiServiceProxies.TenantServiceProxy,
        ApiServiceProxies.UserServiceProxy,
        ApiServiceProxies.TokenAuthServiceProxy,
        ApiServiceProxies.AccountServiceProxy,
        ApiServiceProxies.ConfigurationServiceProxy,
        ApiServiceProxies.MaterialServiceProxy,
        ApiServiceProxies.SupplierServiceProxy,
        ApiServiceProxies.FormulaServiceProxy,
        ApiServiceProxies.UnitServiceProxy,
        ApiServiceProxies.TransferServiceProxy,
        ApiServiceProxies.ProductServiceProxy,
        ApiServiceProxies.WarehouseMaterialServiceProxy,
        ApiServiceProxies.PlanServiceProxy,
        ApiServiceProxies.NotificationServiceProxy,
        ApiServiceProxies.WarehouseServiceProxy,
        ApiServiceProxies.OutputRequestServiceProxy,
        ApiServiceProxies.DailyProductionServiceProxy,
        ApiServiceProxies.ChildServiceProxy ,
        ApiServiceProxies.WorkflowStepIndexServiceProxy ,
        ApiServiceProxies.WorkflowStepServiceProxy ,
        ApiServiceProxies.CategoryServiceProxy ,
        ApiServiceProxies.WorkflowServiceProxy,

        { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true }
    ]
})
export class ServiceProxyModule { }
