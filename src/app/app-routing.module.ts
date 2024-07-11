import { LayoutModule } from '@app/layout/layout.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { TenantsComponent } from './tenants/tenants.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'production', loadChildren: () => import('./production/production.module').then(m => m.ProductionModule)  },
                    { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)},
                    { path: 'warehouses', loadChildren: () => import('./warehouses/warehouses.module').then(m => m.WarehousesModule) },
                    { path: 'security', loadChildren: () => import('./security/security.module').then(m => m.SecurityModule) },
                    { path: 'notifications', loadChildren: () => import('../app/layout/notification/notification.module').then(m => m.NotificationModule) },
                    { path: 'personnel', loadChildren: () => import('./personnel/personnel.module').then(m => m.PersonnelModule) },
                    { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
                    { path: 'workflow', loadChildren: () => import('./workflow/work-flow.module').then(m => m.WorkFlowModule) },
                ]
            },
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
