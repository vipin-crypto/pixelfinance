
import base from '../../../b2c/services/api.service'
import { ApiService } from 'src/app/b2c/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterBody } from '../../requests/filter-body';
import { Categories } from 'src/app/models/categories';
import { CategorymodalComponent } from './categorymodal/categorymodal.component';
import { Resp } from 'src/app/models/Resp';
import Swal from 'sweetalert2'
import { ThemePalette } from '@angular/material/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit 
{
  imageurl = base;
  serialNumber = 0;
  totalItems: number;
  currentPage: number;
  categoryList;
  loading: boolean = true;
  color: ThemePalette = 'primary';
  role:any;
  access:any;
  flags = {
    isEdit: false
  };

  @ViewChild(CategorymodalComponent, { static: false }) public modalComponent: CategorymodalComponent;
  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() 
  {
    this.role=JSON.parse(localStorage.getItem('Dayfresh_Admin'));
    this.access=JSON.parse(localStorage.getItem('permission'));
    this.currentPage = 1;
    // this.getallCategories()
  }

  // getallCategories() {
  //   this.api.getallCategories(this.currentPage).subscribe((response: any) => {
  //     // console.log(response);
  //     this.categoryList = response.data;
  //     this.totalItems = response.count;
  //     this.loading = false;
  //   })
  // }

  changeStatus(event, item) 
  {
    // console.log(event);
    const formData = new FormData();
    formData.append('id', item._id);
    formData.append('isUpto', event)
    this.api.updateCategory(formData).subscribe((response: any) => {
      if (!response.success) return this.errorToast(response.message);
      this.successToast('Status updated successfully!');
    });
  }

  pageChange(pages) 
  {
    this.currentPage = pages.page;
    this.serialNumber = 10 * this.currentPage - 10;
    // this.getallCategories();
  }


  //delete Category
  deleteCategory(id: any) 
  {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.api.deleteCategory(id).subscribe((res: any) => {
          if (!res.success) return;
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Your Category has been deleted!',
            icon: 'success'
          })
          // this.getallCategories();
        })
      }
    })
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
