import { Component, OnInit, ViewChild } from '@angular/core';
import { Categories } from '../../models/categories';
import { SubCategories } from '../../models/SubCategories';
import { ApiService } from 'src/app/b2c/services/api.service'

import base from 'src/app/b2c/services/api.service';
import { SubcategorymodalComponent } from './subcategorymodal/subcategorymodal.component';
declare var swal: any;
import Swal from 'sweetalert2'
import { ToastrManager } from 'ng6-toastr-notifications';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  totalItems: number;
  currentPage;
  serialNumber = 0;
  imageUrl;
  loading: boolean = true;
  color: ThemePalette = 'primary';
  categoryId: any;
  categoryList: Array<Categories> = [];
  subCatList: Array<SubCategories> = [];
  role:any;
  access:any;
  
  @ViewChild(SubcategorymodalComponent, { static: false }) modal: SubcategorymodalComponent;

  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    // this.tokenVal=JSON.parse(localStorage.getItem('token'));
    this.categoryId = ''
    this.currentPage = 1
    this.imageUrl = base;
    this.role=JSON.parse(localStorage.getItem('Dayfresh_Admin'));
    this.access=JSON.parse(localStorage.getItem('permission'));
    // this.filterBody.category = '';

  }


  getSubCategories() {
    this.api.getallSubCategories(this.categoryId, this.currentPage).subscribe((response: any) => {
      // console.log("response from subcat"+JSON.stringify(response));
      console.log(response);
      if (!response.success) return;
      this.subCatList = response.data;
      this.loading = false;
      // console.log("subCatList Json"+JSON.stringify(this.subCatList));
      this.totalItems = response.count;
    });
  }


  //delete sub-category
  deleteSubCat(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this sub category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        this.api.deleteSubCategory(id).subscribe((res: any) => {
          if (!res.success) return;
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Your sub category has been deleted!',
            icon: 'success'
          })
          this.getSubCategories();
        })
      }
    })
  }


  onPageChange(page) {
    this.currentPage = page.page;
    this.serialNumber = 10 * this.currentPage - 10
    this.getSubCategories();
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
