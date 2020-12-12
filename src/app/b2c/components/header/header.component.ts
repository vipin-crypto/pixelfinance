import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/commonservice/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  role:any;
  access:any;
  constructor(private auth: ApiService) { }

  ngOnInit() {
    this.role=localStorage.getItem('role');
    this.access=localStorage.getItem('email');
  }

   
  logout()
  {
    localStorage.clear();
  }
}
