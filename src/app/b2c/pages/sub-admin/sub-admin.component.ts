import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import base from '../../services/api.service';
import Swal from 'sweetalert2';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ThemePalette } from '@angular/material/core';
import { saveAs } from 'file-saver';
import { SubAdminModalComponent } from './sub-admin-modal/sub-admin-modal.component';
 
@Component({
  selector: 'app-sub-admin',
  templateUrl: './sub-admin.component.html',
  styleUrls: ['./sub-admin.component.scss']
})
export class SubAdminComponent implements OnInit 
{
  delAddress:any;
  currentPage: number;
  subAdminList: any;
  totalItems: any;
  borrowerdata:any;
  serialNumber = 0;
  loading: boolean = false;
  color: ThemePalette = 'primary';
  imageUrl = base;
  defaultImage = "assets/img/defaultuser.jpg";
  selectSubAdmin: any = '';
  fenceList:any;
   
  @ViewChild(SubAdminModalComponent, { static: false }) modal: SubAdminModalComponent;
  role: any;
  admin_bussi: any;
  admin_id: any;
  selectedDocument: any;

  constructor(private api: ApiService, private toaster: ToastrManager) 
  {
    this.role = localStorage.getItem('role') 
  }

  ngOnInit() 
  {
    this.currentPage = 1;
   if(this.role == 'Admin') this.getborrower();
   if(this.role == 'SAdmin') this.getallborrower()
   this.getallSubAdmin();
  }

  getallSubAdmin()
  {
    this.api.getAllborrower().subscribe((res: any) => {
     console.log(res)
    })
  }

  

  getallborrower()
  {
    this.api.getallsuperadminborrower().subscribe((res:any)=>
    {
      this.borrowerdata = res.data
    })
  }




  verifyborrowerS(e,id)
  {
   if(e == 1)
   {
     
   }
   else
   {
    const data =
    {
      "BorrowerId": id ,
      "isApproved":true
    }
this.api.verifyborrowerSper(data).subscribe((res)=>{
  console.log("res",res)
    })
   }
  }

  getborrower()
  {
    this.api.getborrower().subscribe((res:any)=>
    {
      this.borrowerdata = res.data;
      console.log("borrower",res);
    })
  }




  verifySubAdmin(data)
  {
    let body={
      id:data._id,
       isVerify:true
    }
    this.api.updateAdmin(body).subscribe((response: any) => {
      if (!response.success) {
        return this.errorToast(response.message);
      }
      this.successToast('Sub Admin verified successfully!');
      this.getallSubAdmin();
    })
  }


approveSubAdmin(data)
{
  let body={
    id:data._id,
    isApproved:true
  }
  this.api.updateAdmin(body).subscribe((response: any) => {
    if (!response.success) {
      return this.errorToast(response.message);
    }
    this.successToast('Sub Admin approved successfully!');
    this.getallSubAdmin();
})
}

  getFenceList()
  {
    this.api.getAllGeofencingList().subscribe((response:any)=>{
    this.fenceList=response.data;
    })
  }

  //   approveUser(item: any) {
  //   const formData = new FormData();
  //   formData.append('id', item._id); 
  //   formData.append('isVerified', 'true');
  //   this.api.updateUser(formData).subscribe((response: any) => {
  //   if (!response.success) return this.errorToast(response.message);
  //   this.successToast('User updated successfully!');
  //   this.getallSubAdmin();
  //   });
  // }


  //delete User
  deleteSubAdmin(id: any) 
  {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Borrower!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        const data =
        {
          "BorrowerId": id,
          "isDeleted":true
        }
        this.api.deleteSubAdmin(data).subscribe((res: any) => {
          if (res.statusCode != 200) return;
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Your sub admin has been deleted!',
            icon: 'success'
          })
          this. getborrower();
        })
      }
    })
  }


  onPageChange(pages) 
  {
    this.currentPage = pages.page;
    this.serialNumber = 10 * this.currentPage - 10;
    this.getallSubAdmin()
  }

  successToast(message) 
  {
    this.toaster.successToastr(message, '', {
      maxShown: 1
    });
  }

  errorToast(message) 
  {
    this.toaster.errorToastr(message);
  }

}
