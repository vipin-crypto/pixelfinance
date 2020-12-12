import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { B2cRoutingModule } from './b2c-routing.module';
import { B2cComponent } from './b2c.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoryComponent } from './pages/category/category.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FullComponent } from './components/full/full.component';
//import { ComponentsComponent } from '../b2b/components/components.component';
import { SubCategoryComponent } from './pages/sub-category/sub-category.component';
import { SubcategorymodalComponent } from './pages/sub-category/subcategorymodal/subcategorymodal.component';
import { CategorymodalComponent } from './pages/category/categorymodal/categorymodal.component';
import { BannerComponent } from './pages/banner/banner.component';
import { UsersComponent } from './pages/users/users.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { OrderHistoryComponent } from './pages/users/order-history/order-history.component';
import { UserModalComponent } from './pages/users/user-modal/user-modal.component'
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { ToastrModule } from 'ng6-toastr-notifications';
import { PaginationModule, BsDatepickerModule } from 'ngx-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AuthGuard } from '../commonservice/auth.guard';
import { NewOrderListComponent } from './pages/order/new-order-list/new-order-list.component';
import { OrderComponent } from './pages/order/order.component';
import { NewOrderModalComponent } from './pages/order/new-order-list/new-order-modal/new-order-modal.component';
import { PackinventoryComponent } from './pages/packinventory/packinventory.component'
import { AmazingTimePickerModule } from 'amazing-time-picker'; // this line you need
import { BannerModalComponent } from './pages/banner/banner-modal/banner-modal.component';
import { OrderListComponent } from './pages/order/order-list/order-list.component';
import { OrderModalComponent } from './pages/order/order-list/order-modal/order-modal.component';
// what the heck is this ?
import { SettingComponent } from './pages/setting/setting.component';
import { DriverComponent } from './pages/driver/driver.component';
import { AddDriverComponent } from './pages/driver/add-driver/add-driver.component';
import { EditDriverComponent } from './pages/driver/edit-driver/edit-driver.component';
import { DriverModalComponent } from './pages/driver/driver-modal/driver-modal.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AgmCoreModule } from '@agm/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule } from '@angular/material';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GetInterceptorService } from './services/get-interceptor/get-inerceptor.service';
import { BroadcastComponent } from './pages/broadcast/broadcast.component';
import { NumberOnlyDirective } from './pages/directives/number-only/number-only.directive';
import { CharacterOnlyDirective } from './pages/directives/character-only/character-only.directive';
import { DecimalnumberDirective } from './pages/directives/decimal-only/decimalnumber.directive';
import { SubAdminPermissionComponent } from './pages/sub-admin/sub-admin-permission/sub-admin-permission.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FusionChartsModule } from "angular-fusioncharts";
// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import * as TimeSeries from 'fusioncharts/fusioncharts.timeseries'; // Import timeseries
// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme,TimeSeries);
import { VendorsComponent } from './pages/vendors/vendors.component';

import { AddVendorComponent } from './pages/vendors/add-vendor/add-vendor.component';
import { VendorProductComponent } from './pages/vendors/vendor-product/vendor-product.component';
import { SubAdminComponent } from './pages/sub-admin/sub-admin.component';
import { SubAdminModalComponent } from './pages/sub-admin/sub-admin-modal/sub-admin-modal.component';
// import { CharacterOnlyDirective } from './pages/directives/character-only/character-only.directive';
// import { NumberOnlyDirective } from './pages/directives/number-only/number-only.directive';

import {
  MatToolbarModule,
  MatCardModule,
  MatCheckboxModule,
  MatListModule,
  } from '@angular/material';
import { AmountPipe } from './pipes/amount.pipe';
import { AdminComponent } from './pages/admin/admin.component'
import { AdminModalComponent } from '././pages/admin/admin-modal/admin-modal.component';
import {MatStepperModule} from '@angular/material';
import { ChartsModule, WavesModule } from 'angular-bootstrap-md'
import { EditVendorComponent } from './pages/vendors/edit-vendor/edit-vendor.component';
@NgModule({
  declarations: [
    B2cComponent,
    DashboardComponent,
    SubCategoryComponent,
    SubcategorymodalComponent,
    CategoryComponent,
    CategorymodalComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
 
    VendorProductComponent,
    //ComponentsComponent,
    FullComponent,
    BannerComponent,
    AddVendorComponent,
    EditVendorComponent,
    UsersComponent,
    AdminComponent,
    AddUserComponent,
    EditUserComponent,
    NewOrderListComponent,
    OrderComponent,
    NewOrderModalComponent,
    PackinventoryComponent,
    BannerModalComponent,
    OrderListComponent,
    OrderModalComponent,
    SettingComponent,
    DriverComponent,
    AddDriverComponent,
    EditDriverComponent,
    DriverModalComponent,
    UserModalComponent,
    BroadcastComponent,
    OrderHistoryComponent,
    NumberOnlyDirective,
    CharacterOnlyDirective,
    DecimalnumberDirective,
    SubAdminComponent,
    SubAdminModalComponent,
    AdminModalComponent,
    SubAdminPermissionComponent,
    AmountPipe,
    VendorsComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatStepperModule,
    NgCircleProgressModule,
    ToastrModule.forRoot(),
    PaginationModule.forRoot(),
    NgMultiSelectDropDownModule,
    BsDatepickerModule.forRoot(),
    UiSwitchModule,
    MatExpansionModule,
    MatButtonModule,
    ChartsModule,
    WavesModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatListModule,
    CommonModule,
    MatProgressSpinnerModule,
    GooglePlaceModule,
    B2cRoutingModule,
    AmazingTimePickerModule,
    FusionChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBMrKj9G0-f3QPF-P1D99iBChHT-PIICwo'
    })
  ],
  // providers: [AuthGuard,
  //   { provide: HTTP_INTERCEPTORS, useClass: GetInterceptorService, multi: true  }
  // ],
  exports: [NumberOnlyDirective, CharacterOnlyDirective,DecimalnumberDirective]
})
export class B2cModule { }
