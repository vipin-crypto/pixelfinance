import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/b2c/services/api.service';
import { AddUserBody } from '../../../requests/add-user-body';
import { Router } from "@angular/router";
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  history = window.history;
  body = new AddUserBody();
  flags = {
    isAdded: false
  };
  type: any;
  Description: any;
  price: any;
  role:any;

  constructor(
    private router: Router,
    private api: ApiService,
    private toaster:ToastrManager
  ) { 
    this.role = localStorage.getItem('role')
  }

  ngOnInit() {


  }

addExpanses()
{
  
  console.log("check");
  const data =
  {
    "type": this.type,
    "description": this.Description,
    "price": this.price
  }
 this.api.addExpanses(data).subscribe((res:any)=>
 {
  if(res.statusCode == 200)
  {
    this.toaster.successToastr(res.message, '', {
      maxShown: 1
    });
  }
 })
}

}
