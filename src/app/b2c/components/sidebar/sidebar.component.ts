import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/b2c/services/api.service';
import * as js from '../../../../assets/js/custom';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
   
  path = "assets/img"
  dashboard: any;
  menuItems = [];
  user: any;
  vendor:any;
  category: any;
  subcategory: any;
  order: any;
  product: any;
  setting: any
  SubAdmin: any
  businessType: any
  inventory: any;
  location: string;
  driver: string;
  banner: string;
  role: any;
  access: any;
  personal:any;
  loan:any;
  subadmin: string;
  notification: string;
  offer:string;
  timesloat:string;
  coupon:string;
  truck:string;
  admin:any;
  supermenuItems = [];
  expanse: string;
 
  constructor(private api:ApiService) {
  this.dashboard = 'assets/img/home.png',
  this.user = 'assets/img/user.png'
  this.vendor='assets/img/vendor.png'
  this.category = 'assets/img/category.png'
  this.product =  'assets/img/product.png'
  this.inventory = 'assets/img/inventory.png'
  this.subcategory = 'assets/img/sub-category.png'
  this.order = 'assets/img/order.png'
  this.setting ='assets/img/setting.png'
  this.location = 'assets/img/geofrance.png'
  this.subadmin ='assets/img/subadmin.png'
  this.driver = 'assets/img/driver.png'
  this.banner = 'assets/img/banner.png'
  this.timesloat='assets/img/timeslot.png'
  this.offer='assets/img/offer.png'
  this.notification= 'assets/img/notification.png'
  this.coupon='assets/img/coupon.png'
  this.truck='assets/img/truck.png'
  this.expanse = 'assets/img/expanses.png'
  this.loan = 'assets/img/bank.png'
  this.personal = 'assets/img/personal.png'

  this.role = localStorage.getItem('role');
  }

  ngOnInit() {
    // this.role=JSON.parse(localStorage.getItem('Dayfresh_Admin'));
    // this.access=JSON.parse(localStorage.getItem('permission'));
    js.customScript();

    this.menuItems = [
   // {path: '/dashboard/home', title: 'Dashboard', icon: 'fas fa-fw fa-tachometer-alt', class: ''},
      { path: '/b2c/dashboard', title: 'Dashboard', icon:this.dashboard, class: '' },
      { path: '/b2c/sub-admin', title: 'Borrower', icon: this.vendor, class: '' },
      { path: '/b2c/users', title: 'Expanses', icon:this.expanse, class: '' },
      { path: '/b2c/order', title: 'Reports', icon: this.subcategory , class: '' },
      { path: '/b2c/vendors', title:'Loan', icon: this.loan , class: ''},
      //{ path: '', title:'Personal', icon: this.personal, class: ''}
    ];
  
    this.supermenuItems = [
    { path: '/b2c/dashboard',title: 'Dashboard', icon:this.dashboard, class: ''},
    { path: '/b2c/admin',title:'Branches', icon:this.subadmin, class:''},
    {
      path: '/b2c/sub-admin',title:'Borrowers' , icon: this.vendor, class:''
    },
    { path: '/b2c/order', title: 'Reports', icon: this.subcategory , class: '' },
    { path: '/b2c/users', title: 'Expanses', icon:this.expanse, class: '' },
    { path: '/b2c/vendors', title:'Loan', icon: this.loan , class: ''},
    ];
  }
  }
