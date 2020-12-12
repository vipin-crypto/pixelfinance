import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PackBody } from '../../requests/pack-body';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import { ThemePalette } from '@angular/material';

@Component({
  selector: 'app-packinventory',
  templateUrl: './packinventory.component.html',
  styleUrls: ['./packinventory.component.scss']
})
export class PackinventoryComponent implements OnInit {
  packBody = new PackBody();
  currentPage: any;
  packList;
  serialNumber = 0;
  totalItems: any;
  loading:Boolean=true;
  color: ThemePalette = 'primary';
  selectInventory:any='';
  role:any;
  access:any;
  adminType:any;
  adminId:any;

  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    this.role=JSON.parse(localStorage.getItem('Dayfresh_Admin'));
    this.access=JSON.parse(localStorage.getItem('permission'));
    this.adminType=this.role.type;
    this.adminId=this.role._id;
    this.currentPage = 1;
    this.getPackInventory();
  }

  getPackInventory() {
    this.api.getPackInventory(this.currentPage,this.selectInventory,this.adminType,this.adminId).subscribe((response: any) => {
      // console.log(response);
    this.loading=false;
  
      
      this.packList = response.data
      for(let i=0;i<this.packList.length;i++){
        this.packList[i].price=  this.packList[i].price.toFixed(3)
      }
      for(let i=0;i<this.packList.length;i++){
        this.packList[i].oldPrice=  this.packList[i].oldPrice.toFixed(3)
      }
        // console.log(this.packList);
      this.totalItems = response.count
    })
  }

  

  searchInventory(){
    this.currentPage=1;
    this.getPackInventory();
  }

  resetInventory(){
    this.selectInventory='';
    this.currentPage=1;
    this.getPackInventory();
  }

  updatePack(data) {

    // this.packBody = data;
    // this.packBody.productId = data.productId._id,
    const packdata = {
      id: data._id,
      productId: data.productId,
      quantity: data.quantity,
      price: data.price,
      availablePack: data.availablePack,
      maxUserQuantity: data.maxUserQuantity,
      oldPrice:data.oldPrice,
      userType:this.role.type
    }


    // this.packBody.id = this.packId;

    this.api.updatePackDetails(packdata).subscribe((response: any) => {
      // console.log(response);
      if (!response.success) return this.errorToast(response.message)
      this.successToast('Pack updated successfully!');
    },
      error => {
        // this.flags.isUpdate = false;
      })
  }

  // deletePack(id) {
  //   this.api.deletePack(id).subscribe((res: any) => {
  //             if (!res.success) return;
  //                       this.getPackInventory();
  //   })
  // }

  
  // delete product
   deletePack(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this pack!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.api.deletePack(id).subscribe((res: any) => {
          if (!res.success) return;
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Your pack has been deleted!',
            icon: 'success'
          })
          this.getPackInventory();
        })
      }
    })
  }

  onPageChange(pages) {
    this.currentPage = pages.page;
    this.serialNumber = 10 * this.currentPage - 10
    this.getPackInventory();
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
