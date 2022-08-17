import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ArchwizardModule } from 'angular-archwizard';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule} from '@angular/common/http';
import { NgxPermissionsModule } from 'ngx-permissions';
import {AutoCompleteModule} from 'primeng/autocomplete';

import { AppComponent } from './app.component';
import { MyDeskComponent } from './components/my-desk/my-desk.component';
import { SavingsComponent } from './components/savings/savings.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FsNewProjectComponent } from './components/savings/modules/forecasts-savings/modals/fs-new-project/fs-new-project.component';
import { FsOptionsComponent } from './components/savings/modules/forecasts-savings/modals/fs-options/fs-options.component';
import { FsFiltersComponent } from './components/savings/modules/forecasts-savings/modals/fs-filters/fs-filters.component';
import { FsNpCategoryAllocationComponent } from './components/savings/modules/forecasts-savings/modals/fs-new-project/modals/fs-np-category-allocation/fs-np-category-allocation.component';
import { AlertModalComponent } from './components/shared/modals/alert-modal/alert-modal.component';
import { FsEditProjectComponent } from './components/savings/modules/forecasts-savings/modals/fs-edit-project/fs-edit-project.component';
import { ForecastsSavingsComponent } from './components/savings/modules/forecasts-savings/forecasts-savings.component';
import { ElSavingsComponent } from './components/savings/modules/el-savings/el-savings.component';
import { AllocationSavingsComponent } from './components/savings/modules/allocation-savings/allocation-savings.component';
import { FsBuyersComponent } from './components/savings/modules/forecasts-savings/fs-buyers/fs-buyers.component';
import { FsEpReviewAdjustmentComponent } from './components/savings/modules/forecasts-savings/modals/fs-edit-project/modals/fs-ep-review-adjustment/fs-ep-review-adjustment.component';
import { FsNpLinkToRegComponent } from './components/savings/modules/forecasts-savings/modals/fs-new-project/modals/fs-np-link-to-reg/fs-np-link-to-reg.component';
import { FsAllocationKeysMaintainanceComponent } from './components/savings/modules/forecasts-savings/fs-allocation-keys-maintainance/fs-allocation-keys-maintainance.component';
import { FsDashboardComponent } from './components/savings/modules/forecasts-savings/fs-dashboard/fs-dashboard.component';
import { FsAkmFiltersComponent } from './components/savings/modules/forecasts-savings/fs-allocation-keys-maintainance/modals/fs-akm-filters/fs-akm-filters.component';
import { FsAkmAddAllocationKeyComponent } from './components/savings/modules/forecasts-savings/fs-allocation-keys-maintainance/modals/fs-akm-add-allocation-key/fs-akm-add-allocation-key.component';
import { FsAkmModifyAllocationKeyComponent } from './components/savings/modules/forecasts-savings/fs-allocation-keys-maintainance/modals/fs-akm-modify-allocation-key/fs-akm-modify-allocation-key.component';
import { ConfirmationModalComponent } from './components/shared/modals/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MyDeskComponent,
    SavingsComponent,
    FsNewProjectComponent,
    FsOptionsComponent,
    FsFiltersComponent,
    FsNpCategoryAllocationComponent,
    AlertModalComponent,
    FsEditProjectComponent,
    ForecastsSavingsComponent,
    ElSavingsComponent,
    AllocationSavingsComponent,
    FsBuyersComponent,
    FsEpReviewAdjustmentComponent,
    FsNpLinkToRegComponent,
    FsAllocationKeysMaintainanceComponent,
    FsDashboardComponent,
    FsAkmFiltersComponent,
    FsAkmAddAllocationKeyComponent,
    FsAkmModifyAllocationKeyComponent,
    ConfirmationModalComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    ButtonsModule.forRoot(),
    ArchwizardModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    AutoCompleteModule
  ],
  entryComponents:[],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
