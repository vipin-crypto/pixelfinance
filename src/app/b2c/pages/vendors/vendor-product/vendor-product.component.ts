import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/b2c/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-vendor-product',
  templateUrl: './vendor-product.component.html',
  styleUrls: ['./vendor-product.component.scss']
})
export class VendorProductComponent implements OnInit {
  userId:any;
  role:any;
  totalItems:any;
  access:any;
  productList:any;
  currentPage:any;
  serialNumber:any=0;
  loading: boolean = true;
  history=window.history;
  color: ThemePalette = 'primary';

  constructor(private activateRoute:ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private toaster: ToastrManager
    ) { }

  ngOnInit() {
    this.currentPage=1;
    this.activateRoute.params.subscribe((param: any) => {
      this.userId = param.id;
      this.role=JSON.parse(localStorage.getItem('Dayfresh_Admin'));
      this.access=JSON.parse(localStorage.getItem('permission'));
      this.getVendorProduct();
  })
}

getVendorProduct(){
  this.api.getallProducts(this.currentPage,'','vendor',this.userId,'').subscribe((response:any)=>{
      // console.log(response)
      this.loading=false;
      this.productList=response.data;
  })
}

approveProduct(productId,status){
   if((this.role.type=='SubAdmin' && this.access.manageVendorWrite==true)||(this.role.type=='Admin')){
   let data={ productId, status }
   this.api.approveProduct(data).subscribe((Response:any)=>{
     if(!Response.success) return this.errorToast(Response.message);
     this.successToast(Response.message);
     this.getVendorProduct();
   })
  }
  else{
    this.errorToast('Sorry! you have not permission')
  }
}

onPageChange(pages) {
  this.currentPage = pages.page;
  this.serialNumber = 10 * this.currentPage - 10;
  this.getVendorProduct()
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
