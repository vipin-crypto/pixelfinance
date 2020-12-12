import { Component, OnInit } from '@angular/core';
import { Products } from 'src/app/b2c/models/products';
import { ApiService } from 'src/app/b2c/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import {PermissionBody } from 'src/app/b2c/requests/permission-body';

@Component({
  selector: 'app-sub-admin-permission',
  templateUrl: './sub-admin-permission.component.html',
  styleUrls: ['./sub-admin-permission.component.scss']
})
export class SubAdminPermissionComponent implements OnInit {
  subAdminId:any;
 body=new PermissionBody();
 history = window.history;

  constructor(private api: ApiService, private router: Router, 
    private toaster: ToastrManager, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.subAdminId = params.id;
      this.getSubAdminDetail();
  })
}

  getSubAdminDetail(){
    this.api.getSubAdminDetail(this.subAdminId).subscribe((response:any)=>{
        console.log(response)
        if(response.data.permission==null) {
          this.body=new PermissionBody();
          this.body.userId=this.subAdminId;
        }
        else this.body=response.data.permission;
    })
  }

  submitPermission()
  {
    console.log(this.body);
    this.api.subAdminPermission(this.body).subscribe((response:any)=>{
      if(!response.success) return this.errorToast(response.message);
      this.router.navigateByUrl('/b2c/sub-admin');
      return this.successToast('Permission update successfully');
      
    })
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
