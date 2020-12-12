import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-b2c',
  templateUrl: './b2c.component.html',
  styleUrls: ['./b2c.component.scss']
})
export class B2cComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() 
  {
     
  }
  
  logout() {
    localStorage.clear();
    localStorage.clear();
    document.getElementById('closeLogoutModal').click();
    this.router.navigateByUrl('/Adminlogin');
    
  }
}
