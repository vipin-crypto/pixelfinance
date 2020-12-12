import { Component, OnInit, ViewChild } from '@angular/core';
import base from '../../../b2c/services/api.service'
import { FilterBody } from '../../requests/filter-body';
import { ApiService } from '../../../b2c/services/api.service'
import { Banner } from '../../models/banner';
import { BannerModalComponent } from './banner-modal/banner-modal.component';
declare var swal: any;
import Swal from 'sweetalert2';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  imageurl = base;
  currentPage;
  bannerList;
  totalItems: any;
  loading: boolean = true;
  serialNumber: number = 0;
  role:any;
  access:any;

  @ViewChild(BannerModalComponent, { static: false }) modal: BannerModalComponent;


  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    this.role=JSON.parse(localStorage.getItem('Dayfresh_Admin'));
    this.access=JSON.parse(localStorage.getItem('permission'));
    this.currentPage = 1;
    this.getAllBanners();
  }

  getAllBanners() {
    this.api.getallBanners(this.currentPage).subscribe((res: any) => {
      // console.log(res);
      this.loading = false;
      this.bannerList = res.data;
      this.totalItems = res.data.count;
    })
  }


  //delete Banner
  deleteBanner(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this banner!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.api.deleteBanner(id).subscribe((res: any) => {
          if (!res.success) return;
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Your banner has been deleted!',
            icon: 'success'
          })
          this.getAllBanners();
        })
      }
    })
  }

  changeStatus(event, item) {
    // console.log(item);
    // console.log(event);
    const formData = new FormData();
    formData.append('id', item._id);
    formData.append('isActive', event)
    this.api.editBanner(formData).subscribe((response: any) => {
      if (!response.success) return this.errorToast(response.message);
      this.successToast('Status updated successfully!');
    });
  }

  changeUpto(event, item) {
    // console.log(item);
    // console.log(event);
    const formData = new FormData();
    formData.append('id', item._id);
    formData.append('isUpto', event)
    this.api.editBanner(formData).subscribe((response: any) => {
      if (!response.success) return this.errorToast(response.message);
      this.successToast('Status updated successfully!');
    });
  }

  pageChange(pages) {
    this.currentPage = pages.page;
    this.serialNumber = 10 * this.currentPage - 10;
    this.getAllBanners();
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
