import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/b2c/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ThemePalette } from '@angular/material';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  transId: any;
  status: any;
  transOrderList: any = [];
  currentPage: any;
  serialNumber: number = 0
  history = window.history;
  // totalItem:any;
  selectedAddress: any;
  selectedProduct: any;
  selectedPack: any;
  selectedDriver:any;
  driverLists: any = [];
  requestId: any;
  // TransactionId:any;
  loading:Boolean=true;
  color: ThemePalette = 'primary';
  role:any;
  access:any;
  driver:boolean
  globalStatus='New'
  ShippedStatus:boolean;
   

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    this.role=JSON.parse(localStorage.getItem('Dayfresh_Admin'));
    this.access=JSON.parse(localStorage.getItem('permission'));
    this.currentPage = 1
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.transId = params.id;
      this.status = params.status;
    });
    this.getTransactionOrders();
  }

  getTransactionOrders() {
    // console.log(this.transId, this.status);
    let data={
      id:this.transId,
      status:this.status,
      adminId:this.role._id,
      type:this.role.type
    }
    this.api.getTransactionOrders(data).subscribe((response: any) => {
      // console.log(response);
      this.transOrderList = response.data;
      this.checkAllStatus(this.transOrderList);
      this.checkDriver(this.transOrderList);
      this.loading=false;
      for(let i=0;i<this.transOrderList.length;i++){
        this.transOrderList[i].pack.price= this.addZeroes(this.transOrderList[i].pack.price)
      }
      // this.totalItem=response.count
      // console.log(this.transOrderList);

    })
  }

  checkAllStatus(array){
     if(array.find(o=>o.status=='New')){
      this.globalStatus='New'
     } 
    else if(array.find(o=>o.status=='Accepted')){
       this.globalStatus='Accepted'
     }
     else if(array.find(o=>o.status=='Packing')){
      this.globalStatus='Packing'
    }
    else if(array.find(o=>o.status=='ReSchedule')){
      this.globalStatus='ReSchedule'
    }
    else if(array.find(o=>o.status=='Shipped')){
      this.globalStatus='Shipped'
    }  
    else if(array.find(o=>o.status=='Delivered')){
      this.globalStatus='Delivered'
    }
    else this.globalStatus='Rejected'
    
  }

  checkDriver(list){
    this.driver=false;
    if(list.find(o=>o.driver==null)){
      this.driver=true;
      return;
    }
  }
   

  addZeroes(numb)
   {
    let num:any = Number(numb);
    // If not a number, return 0
    if (isNaN(num)) {
        return 0;
    }
    // If there is no decimal, or the decimal is less than 2 digits, toFixed
    if (String(num).split(".").length < 2 || String(num).split(".")[1].length<=2 ){
        num = num.toFixed(3);
    }
    
    // Return the number
    return num; }

  processOrder(idi, state) {
    const data = {
      id: idi,
      status: state
    }
    this.api.processOrder(data).subscribe((response: any) => {
      console.log(response);
      if (!response.success) return this.errorToast(response.message)
      this.successToast('Order status successfully updated')
      this.getTransactionOrders();
    }), error => {

    }
  }

  processOrderShipped(item, state)
   {
    if(!item.driver) return this.errorToast('Please assign driver first')
    const data = {
      id: item._id,
      status: state
    }
    this.api.processOrder(data).subscribe((response: any) => {
      console.log(response);
      if (!response.success) return this.errorToast(response.message)
      this.successToast('Order status successfully updated')
      this.getTransactionOrders();
    }), error => {

    }
  }

  ProcessAllOrderShipped(list,state){
    if(list.find(o=>o.driver==null)){
     this.errorToast('Please driver assign first');
     return;
    }
    this.ProcessAllOrder(this.transId,state);
  }

  ProcessAllOrder(idi, state) {
    const data = {
      transactionId: idi,
      status: state,
      adminId:this.role._id
    }
    this.api.acceptTransaction(data).subscribe((response: any) => {
      console.log(response);
      if (!response.success) return this.errorToast(response.message)
      this.successToast('Order status successfully updated')
      this.getTransactionOrders();
    }), error => {

    }
  }

  // getDrivers() {
  //   this.api.getDrivers("''").subscribe((response: any) => {
  //     console.log(response);
  //     this.driverLists = response.data;
  //   })
  // }

  pageChange(page) {
    this.currentPage = page.page;
    this.serialNumber = 10 * this.currentPage - 10
    this.getTransactionOrders();
  }

  successToast(message) {
    this.toaster.successToastr(message, '', {
      maxShown: 1
    });
  }

  errorToast(message) {
    this.toaster.errorToastr(message);
  }
}
