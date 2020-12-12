import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import Swal from 'sweetalert2'
import { ToastrManager } from 'ng6-toastr-notifications';
// import * as fileSaver from 'file-saver';
import { saveAs } from 'file-saver';
import base from '../../services/api.service';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  url=base;
  totalItems: number;
  selectedAddress: any;
  selectedDocument: any;
  currentPage = 1;
  serialNumber = 0;
  driverList: any = [];
  selectDriver: any = ''
  loading: boolean = true;
  color: ThemePalette = 'primary';
  role:any;
  access:any;

  constructor(
    private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    this.role=JSON.parse(localStorage.getItem('Dayfresh_Admin'));
    this.access=JSON.parse(localStorage.getItem('permission'));
    this.getDrivers();
  }
  getDrivers() {
    
    this.api.getDrivers(this.currentPage, this.selectDriver).subscribe((response: any) => {
      if (!response.success) return;
      this.driverList = response.data;
      this.loading=false;
      for(let i=0;i<this.driverList.length;i++){
      if(this.driverList[i].type=='B2C'){
        this.driverList[i].type='Dayfresh';
      }
      if(this.driverList[i].type==""){
        this.driverList[i].type='';
      }
 
      }
  
      this.totalItems = response.count;
    }, error => {

    });
  }

  selectDriverType(type, id) {
    console.log(type);
    const formData = new FormData();

    if(type=="") return this.errorToast('Please select valid Type')
    if(type=="Dayfresh"){
      formData.append('type','B2C')
      formData.append('appCountry',JSON.stringify(['india']))
    }
    if(type=='Taazij'){
      formData.append('type','B2C')
      formData.append('appCountry',JSON.stringify(['kuwait']))
    }
    if(type=="B2B"){
      formData.append('type','B2B')
 
    }
    formData.append('id', id)
    
    this.api.editDriver(formData).subscribe((response: any) => {
      if (!response.success) {
        return this.errorToast(response.message);
      } else {
        this.successToast('Driver Edit successfully!');
        this.getDrivers();
      }
    }, error => {
 
    });
  }

  searchDriver() {
    this.getDrivers();
  }

  resetDriver() {
    this.selectDriver = '';
    this.currentPage = 1;
    this.getDrivers();
  }


  getAddress(data) {
    this.selectedAddress = {
      address: data.address,
      country: data.country,
      state: data.state,
      city: data.city,
      street: data.street,
      pinCode: data.pinCode
    }
  }

  getDocuments(docs) {
    this.selectedDocument = {
      documentOne: docs.documentOne,
      documentTwo: docs.documentTwo,
      documentThree: docs.documentThree
    }
  }

  generateDriverCsv(){
    this.api.generateDriverCsv().subscribe((response:any)=>{
      if(!response.status) this.errorToast(response.message)
      saveAs(`${this.url}/csv${response.file}`,"driverCSV.csv")
      this.successToast(response.message);
    })
  } 

  //delete pack
  deleteDriver(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this driver!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.api.deleteDriver(id).subscribe((res: any) => {
          if (!res.success) return;
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Your driver has been deleted!',
            icon: 'success'
          })
          this.getDrivers();
        })
      }
    })
  }

  approveDriver(item: any, type) {
 
    if (item.type == '') return this.errorToast('Select Type First')
    const formData = new FormData();
    formData.append('id', item._id);
    if (type == 1) formData.append('isApprove', 'true');
    if (type == 2) formData.append('isVerified', 'true');
  
    this.api.editDriver(formData).subscribe((response: any) => {
      if (!response.success) return this.errorToast(response.message);
      this.successToast('Driver updated successfully!');
      this.getDrivers();
    });
  }

  changeStatus(event, item) {
    // console.log(event);
    const formData = new FormData();
    formData.append('id', item._id);
    formData.append('isActive', event)
    this.api.editDriver(formData).subscribe((response: any) => {
      if (!response.success) return this.errorToast(response.message);
      this.successToast('Driver updated successfully!');
      this.getDrivers();
    });
  }


  onPageChange(pages) {
    this.currentPage = pages.page;
    this.serialNumber = 10 * this.currentPage - 10
    this.getDrivers();
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
