import { Component, OnInit} from '@angular/core';
import { ApiService } from '../../services/api.service';
import base from '../../services/api.service';
import Swal from 'sweetalert2';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ThemePalette } from '@angular/material/core';
import { saveAs } from 'file-saver';
import { Router } from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  delAddress:any;
  currentPage: number;
  userList: any;
  totalItems: any;
  serialNumber = 0;
  loading: boolean = false;
  color: ThemePalette = 'primary';
  imageUrl = base;
  defaultImage = "assets/img/defaultuser.jpg";
  selectUser: any = ''
  userType:any="";
  role:any;
  access:any;
  expanses:any;
  expansestotal:any;
  constructor(private api: ApiService, private toaster: ToastrManager,private router :Router) { }

  ngOnInit() {
    this.role= localStorage.getItem('role');
    this.access=JSON.parse(localStorage.getItem('permission'));
    this.currentPage = 1;
    this.getallUsers()
 
  }

  getallUsers() {
    if(this.role == 'Admin')
    {
      this.api.getexapnses().subscribe((res:any)=>
      {
        this.expansestotal = res.data;
      })
    }
    if(this.role == 'SAdmin')
    {
      this.api.getallExpanses().subscribe((res:any)=>
      {
        this.expansestotal = res.data
      })
    }
  }

  

  getTypeUser()
  {
    this.currentPage=1;
    this.getallUsers();
  }

  approveUser(item: any) 
  {
    const formData = new FormData();
    formData.append('id', item._id);
    formData.append('isVerified', 'true');
    this.api.updateUser(formData).subscribe((response: any) => {
      if (!response.success) return this.errorToast(response.message);
      this.successToast('User updated successfully!');
      this.getallUsers();
    });
  }

  searchUser() 
  {
    this.getallUsers();
  }

  reset() {
    this.selectUser = '';
    this.currentPage = 1;
    this.getallUsers();
  }

  generateUsercsv()
  {
  this.api.generateUserCsv().subscribe((response:any)=>{
    if(!response.status) this.errorToast(response.message)
    saveAs(`${this.imageUrl}/csv${response.file}`,"driverCSV.csv")
    this.successToast(response.message);

  })
}
  deleteUser(id: any) 
  {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this User!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.api.deleteUser(id).subscribe((res: any) => {
          if (!res.success) return;
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Your user has been deleted!',
            icon: 'success'
          })
          this.getallUsers();
        })
      }
    })
  }

  gotoUpdate(id)
  {
  
    this.router.navigate(['b2c/users/edit-user/1'],{queryParams:{'id':id}})
  }

  onPageChange(pages) {
    this.currentPage = pages.page;
    this.serialNumber = 10 * this.currentPage - 10;
    this.getallUsers()
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
