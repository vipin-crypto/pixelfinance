import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoryComponent } from './pages/category/category.component';
import { B2cComponent } from './b2c.component';
import { SubCategoryComponent } from './pages/sub-category/sub-category.component';
import { BannerComponent } from './pages/banner/banner.component';
import { UsersComponent } from './pages/users/users.component';
import { EditUserComponent } from './pages/users/edit-user/edit-user.component';
import { AddUserComponent } from './pages/users/add-user/add-user.component';
import { OrderHistoryComponent } from './pages/users/order-history/order-history.component';
import { NewOrderListComponent } from './pages/order/new-order-list/new-order-list.component';
import { PackinventoryComponent } from './pages/packinventory/packinventory.component';
import { OrderListComponent } from './pages/order/order-list/order-list.component';
import { SettingComponent } from './pages/setting/setting.component';
import { DriverComponent } from './pages/driver/driver.component';
import { AddDriverComponent } from './pages/driver/add-driver/add-driver.component';
import { EditDriverComponent } from './pages/driver/edit-driver/edit-driver.component';
import { BroadcastComponent } from './pages/broadcast/broadcast.component';
import { SubAdminComponent } from './pages/sub-admin/sub-admin.component';
import { SubAdminPermissionComponent } from './pages/sub-admin/sub-admin-permission/sub-admin-permission.component';
import { AdminComponent } from './pages/admin/admin.component';
import { VendorsComponent } from './pages/vendors/vendors.component';
import { AddVendorComponent } from './pages/vendors/add-vendor/add-vendor.component';
import { VendorProductComponent } from './pages/vendors/vendor-product/vendor-product.component';
import { EditVendorComponent } from './pages/vendors/edit-vendor/edit-vendor.component';


const routes: Routes = [
  {
    path: '', component: B2cComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'admin', component: AdminComponent},
      { path: 'categories', component: CategoryComponent },
      { path: 'sub-category', component: SubCategoryComponent },
      { path: 'banner', component: BannerComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/add-user', component: AddUserComponent },
      { path: 'users/edit-user/:id', component: EditUserComponent },
      { path: 'users/order-history/:id',component:OrderHistoryComponent },
      { path: 'drivers', component: DriverComponent },
      { path: 'drivers/add-driver', component: AddDriverComponent },
      { path: 'drivers/edit-driver/:id', component: EditDriverComponent },
      { path: 'order', component: NewOrderListComponent },
      { path: 'packs', component: PackinventoryComponent },
      { path: 'order/order-detail', component: OrderListComponent },
      { path: 'broadcast', component: BroadcastComponent },
      { path: 'setting', component: SettingComponent },
      { path: 'sub-admin', component:SubAdminComponent},
      { path: 'sub-admin/permission/:id', component:SubAdminPermissionComponent},
      { path: 'vendors',component:VendorsComponent},
      { path: 'vendors/add', component: AddVendorComponent},
      {path : 'vendors/edit',component:EditVendorComponent},
      { path: 'vendor-product/:id', component: VendorProductComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class B2cRoutingModule { }
