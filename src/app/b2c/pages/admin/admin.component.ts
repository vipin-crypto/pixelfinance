import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import base from '../../services/api.service';
import Swal from 'sweetalert2';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ThemePalette } from '@angular/material/core';
import { saveAs } from 'file-saver';
import { AdminModalComponent } from './admin-modal/admin-modal.component';
 
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit 
{
  @ViewChild(AdminModalComponent, { static: false }) modal: AdminModalComponent;
  delAddress:any;
  currentPage: number;
  subAdminList: any;
  totalItems: any;
  serialNumber = 0;
  loading: boolean = false;
  color: ThemePalette = 'primary';
  imageUrl = base;
  defaultImage = "assets/img/defaultuser.jpg";
  selectSubAdmin: any = '';
  fenceList:any;
  superlist:any;
  branchesList:any;
  

  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
   this.currentPage = 1;
   this.getAllBranches();
  }

  getAllBranches(){
    debugger
    this.loading = true;
    this.api.getAdmindeatials().subscribe((response: any) => {
      this.branchesList = response.data;
      this.loading = false;
  })
  }

  getallAdmin() {
    this.loading = true;
    this.api.getAdmindeatials().subscribe((response: any) => {
      this.branchesList = response.data;
      this.loading = false;
  })
  }


approveSubAdmin(data){
  let body={
    id:data._id,
    email:data.email,
    type:'Admin',
    isBlocked:true
  }
  this.api.updateAdmin(body).subscribe((response: any) => {
    if (!response.success) {
      return this.errorToast(response.message);
    }
    this.successToast('Admin approved successfully!');
    this.getallAdmin();
})
}
  //delete User
  deleteSubAdmin(data) {

    let body={
      id:data._id,
      email:data.email,
      type:'Admin',
      isDeleted:true
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this Sub Admin!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.api.updateAdmin(body).subscribe((res: any) => {
          if (!res.success) return;
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Your sub admin has been deleted!',
            icon: 'success'
          })
          this.getallAdmin();
        })
      }
    })
  }


  onPageChange(pages) {
    this.currentPage = pages.page;
    this.serialNumber = 10 * this.currentPage - 10;
    this.getallAdmin()
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
