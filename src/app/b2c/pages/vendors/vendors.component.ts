import { Component, OnInit } from '@angular/core';
 import { ToastrManager } from 'ng6-toastr-notifications';
import { ThemePalette } from '@angular/material';
import base, { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {
  delAddress:any;
  currentPage: number;
  vendorList: any;
  totalItems: any;
  serialNumber = 0;
  loading: boolean = true;
  color: ThemePalette = 'primary';
  imageUrl = base;
  defaultImage = "assets/img/defaultuser.jpg";
  selectvendor: any = ''
  userType:any="";
  role:any;
  borrowerloan:any;
  access:any;
  browwerloan:any
  rolecheck:any;
  constructor(private api: ApiService, private toaster: ToastrManager) {
    this.rolecheck = localStorage.getItem('role');
   }

  ngOnInit() {
    if(this.rolecheck == 'SAdmin')
    {
      this.api.getverifiedborrower().subscribe((res)=>
      {
        this.borrowerloan = res
        this.browwerloan = this.borrowerloan.data
        console.log(this.borrowerloan);
      })
    }
else
{
  this.api.getadminborrowerloan().subscribe((res)=>
  {
    this.borrowerloan = res
    this.browwerloan = this.borrowerloan.data
    console.log("checkborrower",this.borrowerloan);
  })
}
  }



 //delete User
 deleteVendor(id: any) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this Vendor!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085D6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes',
    allowOutsideClick: false,
  }).then((result) => {
    if (result.value) {
      this.api.deleteVendor(id).subscribe((res: any) => {
        if (!res.success) return;
        Swal.fire({
          title: 'Deleted!',
          text: 'Poof! Your Vendor has been deleted!',
          icon: 'success'
        })
      
      })
    }
  })
}
//edit loans
editLoans()
{
   
}
//delete loans
deleteloans()
{

}

transferb(id)
{
  this.api.transferboower(id);
}

onPageChange(pages) {
  this.currentPage = pages.page;
  this.serialNumber = 10 * this.currentPage - 10;
  
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


