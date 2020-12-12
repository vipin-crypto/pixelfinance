import { Component, OnInit } from '@angular/core';
import { SuperAdminBody } from '../b2c/requests/login-body'
import { ApiService } from '../commonservice/api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-superlogin',
  templateUrl: './superlogin.component.html',
  styleUrls: ['./superlogin.component.scss']
})
export class SuperloginComponent implements OnInit {

  loginBody = new SuperAdminBody();
  roles:any;
  errorMessage: any = "Error";
  flags = {
    isLogin: false,
    isError: false
  };
  email: any;
  password: any;


  constructor(private api: ApiService,
    private localStorage: LocalStorageService,
    private router: Router, private toaster: ToastrManager) { }

  ngOnInit() {
  }

  login() {
    const data = {
      "email":this.email,
      "password":this.password
    }
    this.flags.isLogin = true;
      this.api.superadmin(data).subscribe((response: any) => {
        debugger
        console.log(response);
        this.flags.isLogin = false;
        if (response.statusCode != 200) 
        {
          this.flags.isLogin = false;
          this.errorMessage = response.message;
          return this.errorToast(this.errorMessage);
        }
        this.roles = response.data.role;
        this.api.sendToken(response.super_admin_details)
        this.router.navigate(['/b2c/dashboard'])
        localStorage.setItem("email",response.data.email)
        localStorage.setItem('supertoken',response.data.accessToken)
        localStorage.setItem("role",'SAdmin');
    
      }, error => {
        console.log(error);
        this.flags.isLogin = false;
      })
  }

  asaBranch()
  {
    this.router.navigate(['/Adminlogin'])
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
