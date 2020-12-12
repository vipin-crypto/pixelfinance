import { Component, OnInit } from '@angular/core';

import { FilterBody } from '../../../requests/filter-body';
import { Orders } from 'src/app/models/Orders';
import { Driver } from 'src/app/models/driver';
import { Resp } from 'src/app/models/Resp';
import { ApiService } from 'src/app/b2c/services/api.service';
import base from 'src/app/b2c/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { saveAs } from 'file-saver';
import { ThemePalette } from '@angular/material/core';
import * as moment from 'moment';



@Component({
  selector: 'app-new-order-list',
  templateUrl: './new-order-list.component.html',
  styleUrls: ['./new-order-list.component.scss']
})
export class NewOrderListComponent implements OnInit {
  
   chartType: string = 'bar';
   count:any;
   arraylist = [];
   arraylist2 = [];
   arraylist3 = [];
   chartDatasets: Array<any> = [
    { data: this.arraylist, label: 'My First dataset' }
  ];

   chartLabels: Array<any> = ['pending', 'Total profite', 'loans', 'Profite', 'borrower', 'expanses'];

 chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  graphdata: any;
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  constructor(
    private api: ApiService, private toaster: ToastrManager
  ) {
     
   }

  ngOnInit() {
    this.api.getAllgraphdata().subscribe((res:any)=>
  {
    debugger
    this.graphdata = res.earningByAdmin;
    this.arraylist = [this.graphdata[0].LoanAmount , this.graphdata[0].PendingLoan , this.graphdata[0].TotalExpanses , this.graphdata[0].borrower]
       this.chartDatasets = [
       {   data: this.arraylist, label: 'My First dataset' }
  ];

  })
  }

  selectchanges(event)
  {
    
    this.count = event.target.value;

  this.api.getAllgraphdata().subscribe((res:any)=>
  {

    this.graphdata = res.earningByAdmin;
    this.arraylist = [this.graphdata[0].LoanAmount , this.graphdata[0].PendingLoan , this.graphdata[0].TotalExpanses , this.graphdata[0].borrower]
    this.arraylist2 = [this.graphdata[1].LoanAmount , this.graphdata[1].PendingLoan , this.graphdata[1].TotalExpanses , this.graphdata[1].borrower];
    this.arraylist3 = [this.graphdata[2].LoanAmount , this.graphdata[2].PendingLoan , this.graphdata[2].TotalExpanses , this.graphdata[2].borrower]
if(this.count == '1' || this.count == 'undefined')
{
  this.chartDatasets = [
    { data: this.arraylist, label: 'My First dataset' }
  ];
}
if(this.count == '2')
{
  this.chartDatasets = [
    { data: this.arraylist2, label: 'My First dataset' }
  ];
}
if(this.count == '3')
{
  this.chartDatasets = [
    { data: this.arraylist3, label: 'My First dataset' }
  ];
}
   
   
  })
}
  

}
