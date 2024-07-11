import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppSessionService } from './session/app-session.service';
import { AppUrlService } from './nav/app-url.service';
import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { LocalizePipe } from '@shared/pipes/localize.pipe';
import { AbpPaginationControlsComponent } from './components/pagination/abp-pagination-controls.component';
import { AbpValidationSummaryComponent } from './components/validation/abp-validation.summary.component';
import { AbpModalHeaderComponent } from './components/modal/abp-modal-header.component';
import { AbpModalFooterComponent } from './components/modal/abp-modal-footer.component';
import { LayoutStoreService } from './layout/layout-store.service';
import { SidebarService } from './services/sidebar/sidebar.service';
import {SharedService} from './services/shared.service';
import { BusyDirective } from './directives/busy.directive';
import { EqualValidator } from './directives/equal-validator.directive';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {SummaryPipe} from '../app/pipes/summury.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommaNumberPipe } from './pipes/comma-number.pipe';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { DateFormattedPipe } from './pipes/date-formatted.pipe';
import { BtSortableHeader } from './directives/bt-sortable-header.directive';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FilterComponent } from './components/filter/filter.component';
import { QueryBuilderModule } from 'angular2-query-builder';
import { DetailsComponent } from '../shared/components/details/details.component'

@NgModule({
    imports: [
        TabsModule.forRoot(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgxPaginationModule,
        NgSelectModule,
        NgxDatatableModule,
        QueryBuilderModule,
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
        PerfectScrollbarModule
    ],
    declarations: [
        AbpPaginationControlsComponent,
        AbpValidationSummaryComponent,
        AbpModalHeaderComponent,
        AbpModalFooterComponent,
        LocalizePipe,
        BusyDirective,
        EqualValidator,
        SummaryPipe,
        CommaNumberPipe,
        SafeHtmlPipe,
        DateFormattedPipe,
        BtSortableHeader,
        FilterComponent,
        DetailsComponent
    ],
    exports: [
        AbpPaginationControlsComponent,
        AbpValidationSummaryComponent,
        AbpModalHeaderComponent,
        AbpModalFooterComponent,
        LocalizePipe,
        BusyDirective,
        EqualValidator,
        TabsModule,
        CommaNumberPipe,
        NgSelectModule,
        NgxDatatableModule,
        SummaryPipe,
        SafeHtmlPipe,
        DateFormattedPipe,
        BtSortableHeader,
        DetailsComponent
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [
                AppSessionService,
                AppUrlService,
                AppAuthService,
                AppRouteGuard,
                LayoutStoreService,
                SidebarService,
                SharedService,

            ]
        };
    }
}
