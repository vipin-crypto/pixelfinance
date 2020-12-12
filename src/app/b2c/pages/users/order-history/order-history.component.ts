import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/b2c/services/api.service';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
 userId:any;
 userOrderList:any;
 serialNumber=0;
 history = window.history;
 delAddress:any;
 loading: boolean = true;
  color: ThemePalette = 'primary';

  constructor(private activatedRoute: ActivatedRoute, private api: ApiService) { }

  ngOnInit(){
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params)
      this.userId = params.id;
    });
    this.getUserOrders();
  }

  getUserOrders(){
  this.api.getUserOrders(this.userId).subscribe((response:any)=>{
    this.userOrderList=response.data;
    this.loading=false;
})
  }
}
