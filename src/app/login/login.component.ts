import { Component, OnInit } from '@angular/core';
import { LoginBody } from '../b2c/requests/login-body'
import { ApiService } from '../commonservice/api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { ToastrManager } from 'ng6-toastr-notifications';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginBody = new LoginBody();

  errorMessage: any = "Error";
  flags = {
    isLogin: false,
    isError: false
  };


  constructor(private api: ApiService,
    private localStorage: LocalStorageService,
    private router: Router, private toaster: ToastrManager) { }

  ngOnInit() {
  }

  login() {
   
    let query;
    this.flags.isLogin = true;
      query = this.api.signInb2c(this.loginBody);
      query.subscribe((response: any) => {
        this.flags.isLogin = false;
        // console.log(response);
        if (response.statusCode != 200) {
          this.flags.isLogin = false;
          this.errorMessage = response.message;
          return this.errorToast(this.errorMessage);
        }
        // this.api.sendToken(response.admin)
        // this.api.getSubAdminDetail(response.admin._id).subscribe((response:any)=>{
        //   let detail=response.data.permission;
        //   localStorage.setItem('permission',JSON.stringify(detail));
        //   this.flags.isLogin = false;
        //   console.log('dayfresh');
        //   
        // })
        localStorage.setItem("email",response.data.email)
        localStorage.setItem("role",'Admin');
        localStorage.setItem("supertoken",response.data.accessToken)
        this.router.navigate(['/b2c/dashboard'])
      }, error => {
        this.flags.isLogin = false;
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

  movetosuperadmin()
  {
    this.router.navigate(['/super-login']);
  }
}
