import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginBody } from '../b2b/requests/login-body';
import { Router } from '@angular/router';
import { SuperAdminBody } from '../b2c/requests/login-body';
import { observable, Observable, BehaviorSubject } from 'rxjs';

declare var swal: any;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  imageUrl = "http://appgrowthcompany.com:5005";
  //imageUrl = 'http://192.168.1.168:4003';
  //imageUrl = 'http://13.232.208.65:4003'
  //baseUrl = 'http://192.168.1.168:4003';
  baseUrl = 'http://3.138.141.253:3000';
  //baseUrl = 'http://13.232.208.65:4003';
 public Super_id = new BehaviorSubject('');
 public $superId_admin = this.Super_id.asObservable();
  constructor(private http: HttpClient, private router: Router) { }

  signInb2b(body: LoginBody) {
    return this.http.post(`${this.baseUrl}/api/b2b/admin/auth/signIn`, body);
  }

  superadmin(body)
  {
    const header = new Headers();
    header.set('Content-Type','application/json');
    header.set('Content-Length','<calculated when request is sent>')
    console.log(body);
    return this.http.post(`${this.baseUrl}/api/v1/superAdmin/login`,body);
  }
  signInb2c(body: LoginBody) {
    return this.http.post(`${this.baseUrl}/api/v1/superAdmin/loginAdmin`, body);
  }

  sendToken(token: string) {
    localStorage.setItem("Dayfresh_Admin", JSON.stringify(token));
  }

  forgotPassword(body){
    return this.http.post(`${this.baseUrl}/api/admin/forgot-password`,body);
  }

  getToken() {
    return localStorage.getItem("Dayfresh_Admin")
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  
  getTokenB2b() {
    return localStorage.getItem("token");
  }

  getSubAdminDetail(id){
    return this.http.get(`${this.baseUrl}/api/admin/subAdmin/${id}`)
}


  isLoggedInB2b() {
    return this.getTokenB2b() !== null;
  }


  getAdminDetail(id)
  {
    return this.http.post(`${this.baseUrl}/api/super_admin/get_admin_details?superAdminId=${id}`,'')
  }

  transferid(id)
  {
    this.Super_id.next(id)
  }


}
