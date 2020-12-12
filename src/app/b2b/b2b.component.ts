import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-b2b',
  templateUrl: './b2b.component.html',
  styleUrls: ['./b2b.component.scss']
})
export class B2bComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    localStorage.clear();
    document.getElementById('closeLogoutModal').click();
    this.router.navigateByUrl('/login');
  }
}
