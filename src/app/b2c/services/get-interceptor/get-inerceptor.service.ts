import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { LocalStorageService } from "angular-web-storage";

@Injectable({
  providedIn: 'root'
})
export class GetInterceptorService {

  constructor(private router: Router) 
  {
  
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedReq = this.handleRequest(req);
    return next.handle(clonedReq);
  }
  

  handleRequest(req: HttpRequest<any>) {
    const user = localStorage.getItem('supertoken');
   // const admin = JSON.parse(user)
    let authReq;
    authReq = req.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': user 
      })
    });
    if(localStorage.getItem('supertoken'))
    {
      authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': user 
        })
      });
    }
 else
 {
  authReq = req.clone({
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  });
 }

 
    return authReq;
  }
}
