import { Component,NgZone, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import * as FusionCharts from "fusioncharts";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalOrder: any;
  totalUser: any;
  totalBanner: any;
  totalCategory: any;
  totalSubcategory: any;
  totalProduct: any;
  dashData: any;
  dataSource:any;
  graphdata:any;
  type: string;
  width: string;
  height: string;
  dataFormat = "json";
  areaData:any;
  saleData:any;
  role:any;
  access:any;
count:any;
  admin_bussi: any;
  admin_id: any;
  loanamount:any;
  Adminlist: any;
  arraylist = [] ;
  arraylist2 = [];
  arraylist3 = [];
   chartType: string = 'pie';

   chartDatasets: Array<any> = [
    { data: this.arraylist, label: 'My First dataset' }
  ];

  chartDataAdmin: Array<any> = [
    { data:this.arraylist2, label: 'My First dataset' }
  ];

  chartDataBranch: Array<any> = [
    { data: this.arraylist3, label: 'My First dataset' }
  ];

   chartLabels: Array<any> = ['pending', 'profit', 'loans', 'borrower', 'expanses'];

   chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];

   chartOptions: any = {
    responsive: true,
    onResize:'50px'
  };
  loanAmount: any;
  borrower: any;
  admincount: any;
   chartClicked(e: any): void { }
   chartHovered(e: any): void { }
  superlist: any;
  constructor(private api: ApiService) {
  this.role = localStorage.getItem('role');
   }

  ngOnInit() 
  {
   this.getAllgraph()
  }

 
getAllgraph()
{
  this.api.getAllgraphdata().subscribe((res:any)=>
  {
    // console.log(res)
    this.graphdata = res.earningByAdmin;
    this.arraylist = [this.graphdata[0].LoanAmount , this.graphdata[0].PendingLoan , this.graphdata[0].TotalExpanses , this.graphdata[0].borrower]
    this.arraylist2 = [this.graphdata[1].LoanAmount , this.graphdata[1].PendingLoan , this.graphdata[1].TotalExpanses , this.graphdata[1].borrower];
    this.arraylist3 = [this.graphdata[2].LoanAmount , this.graphdata[2].PendingLoan , this.graphdata[2].TotalExpanses , this.graphdata[2].borrower]
    // console.log(this.arraylist)
    this.borrower = res.Borrower;
    this.loanamount = res.LoanAmount;
    this.admincount = res.Admin
    this.chartDatasets = [
      { data: this.arraylist, label: 'My First dataset' }
    ];
    this.loanAmount = res.LoanAmount
    this.chartDataAdmin = [
      { data:this.arraylist2, label: 'My First dataset' }
    ];

    this.chartDataBranch = [
      { data: this.arraylist3, label: 'My First dataset' }
    ];
  })
}

}
