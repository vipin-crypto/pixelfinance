import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss']
})
export class BroadcastComponent implements OnInit {
  driverList: any = []
  userList: any = [];


  offerDetails = { category: '', subCategory: '' };

  offerList: Array<any> = [];
  selectedDriver: Array<any> = [];
  selectedUser: Array<any> = [];

  offerBody = { type: '', list: [] };
  bannerFor: any;
  role:any;
  access:any;
  formData = new FormData();
  flags = {
    isAdded: false,
    isUpdate: false,
    isEdit: false
  };

  dropDownSetting: any = {
    enableCheckAll: false,
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };


  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    // this.addBannerBody.coupon = '';
     this.role=JSON.parse(localStorage.getItem('Dayfresh_Admin'));
    this.access=JSON.parse(localStorage.getItem('permission'));
    this.getDrivers();
    this.getUsers();
  }

  async getDrivers() {
    const list = [];
    this.api.getDrivers("''", "").subscribe((response: any) => {
      if (!response.data.length) return;
      response.data.forEach(ele => {
        list.push({
          item_id: ele._id,
          item_text: ele.firstName
        });
      });
      this.driverList = list;
    });
  }

  getUsers() {
    const list = [];
    this.api.getallUsers("''").subscribe((response: any) => {
      if (!response.data.length) return;
      response.data.forEach(ele => {
        list.push({
          item_id: ele._id,
          item_text: ele.firstName
        });
      });
      this.userList = list;
    });
  }

  emptyOfferbody() {
    this.offerBody = { type: '', list: [] };
  }

  pushBroadCast(form: NgForm) {
    // console.log(form.value);
    form.value.list = []
    this.api.broadcast(form.value).subscribe((response: any) => {
      if (!response.success) return this.errorToast(response.message);
        form.reset();
      this.successToast('Message successfully sent');
    }, error => {
      this.flags.isAdded = false;
    });
  }




  onDeSelect(item: any, type: number) {
    let index;
    switch (type) {
      case 1:
        index = this.offerBody.list.indexOf(item.item_id);
        break;
      case 2:
        index = this.offerBody.list.indexOf(item.item_id);
        break;
      case 3:
        index = this.offerBody.list.indexOf(item.item_id);
        break;
      case 4:
        index = this.offerBody.list.indexOf(item.item_id);
    }
    if (index > -1) this.offerBody.list.splice(index, 1);
  }

  onItemSelect(item: any, type: number) {
    switch (type) {
      case 1:
        this.offerBody.type = 'category';
        this.offerBody.list.push(item.item_id);
        break;
      case 2:
        this.offerBody.type = 'subCategory';
        this.offerBody.list.push(item.item_id);
        break;
      case 3:
        this.offerBody.type = 'product';
        this.offerBody.list.push(item.item_id);
        break;
      case 4:
        this.offerBody.type = 'brand';
        this.offerBody.list = [item.item_id];
        break;
    }
  }
  error = message => {
    this.errorToast(message);
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
