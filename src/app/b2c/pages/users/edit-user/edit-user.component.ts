import { Component, OnInit } from '@angular/core';
import { AddUserBody } from "../../../requests/add-user-body";
import { ActivatedRoute, Router } from "@angular/router";
import { Resp } from "../../../models/Resp";
import { ToastrManager } from 'ng6-toastr-notifications';
import { ApiService } from 'src/app/b2c/services/api.service';
import base from 'src/app/b2c/services/api.service';
import countryCode from '../../../requests/countrycode';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent implements OnInit {
  history = window.history;
  body = new AddUserBody();
  userId: string;
  codes = [];
  defaultImage = "assets/img/defaultuser.jpg";
  countryCode: any;
  flags = {
    isUpdate: false
  };
  src: any;
  userdata:any;
  file: File;
  imageUrl = base;
  formData = new FormData();

  singleDropDownSetting: any = {
    enableCheckAll: false,
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
  type: any;
  price: any;
  Description: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private toaster: ToastrManager
  ) { }

  ngOnInit() {
    this.codes = countryCode;
    // countryCode.forEach(ele => {
    //   this.codes.push({ item_id: ele.name, item_text: ele.dial_code })
    // })
  
    this.activatedRoute.queryParams.subscribe((param: any) => {
      this.userId = param['id'];
      this.getupdatEdateexpanse(this.userId);
    });
  }
  getupdatEdateexpanse(value) 
  {
    debugger
      this.api.getexapnses().subscribe((res:any)=>
      {
        this.userdata = res.data.filter(id => id._id == value)
        this.getExpanses(this.userdata)
      })
  }

  getExpanses(value)
  {
  this.type = value[0].type
  this.price = value[0].price
  this.Description = value[0].description
  }


  onImageSelect(e) {
    const file = e.target.files[0];
    this.formData.delete('image');
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.file = file;
      this.formData.append('image', this.file);
    } else {
      this.errorToast('Selected file is not image.');
    }
  }

  editUser() {

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
