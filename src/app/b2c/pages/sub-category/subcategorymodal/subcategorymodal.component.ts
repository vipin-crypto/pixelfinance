import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Categories } from 'src/app/models/categories';
import { AddSubCategoryBody } from 'src/app/b2c/requests/add-sub-category-body';
import { ApiService } from 'src/app/b2c/services/api.service';
import { Resp } from 'src/app/models/Resp';
import base from '../../../services/api.service'
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $: any;

@Component({
  selector: 'app-subcategorymodal',
  templateUrl: './subcategorymodal.component.html',
  styleUrls: ['./subcategorymodal.component.scss']
})
export class SubcategorymodalComponent implements OnInit {

  // @Input() imageUrl: string;

  @Input() categoryList: Array<Categories>;
  @Output() onAddEdit = new EventEmitter();
  body = new AddSubCategoryBody();
  imageUrl = base;
  src: any;
  file: File;
  subcategoryId: any;
  country: any = "india"
  formData = new FormData();

  flags = {
    isAdded: false,
    isUpdate: false,
    isEdit: false
  };
  // tokenVal;
  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {

    // this.tokenVal = JSON.parse(localStorage.getItem('token'));
    this.body.category = '';
  }

  onEditSelect(data) {
    // console.log(data);
    this.flags.isEdit = true;
    this.body = JSON.parse(JSON.stringify(data));
    // console.log(this.body);

    this.body.category = data.category._id;
    // this.body.discount = data.discount;
    // this.body.isUpto = data.isUpto;
    // this.body.name = data.name;
    this.src = `${this.imageUrl}/${data.image}`;
    this.subcategoryId = data._id;
    // this.formData.append('id', data._id);
    document.getElementById('openSubCatModal').click();
  }

  onImageSelect(e) {
    const file = e.target.files[0];
    this.formData.delete('image');
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.file = file;
      this.formData.append('image', this.file);
    } else {
      this.error('Selected file is not image.');
    }
  }

  // addSubCategory() {
  //   if(this.body.name.trim()=="") return this.errorToast('Please enter name')
  //   if (!this.file) return this.error('Please select image first.');
  //   if (this.body.discount == '' || this.body.discount == null || this.body.discount == undefined) this.body.discount = '0'
  //   this.flags.isAdded = true;
  //   this.formData.append('category', this.body.category);
  //   this.formData.append('name', this.body.name);
  //   this.formData.append('isUpto', JSON.stringify(this.body.isUpto));
  //   this.formData.append('discount', this.body.discount);
  //   this.formData.append('type', this.body.type);
  //   this.formData.append('country', this.country);
  //   this.api.addSubCategory(this.formData).subscribe((response: any) => {
  //     this.flags.isAdded = false;
  //     if (!response.success) {
  //       this.formData.delete('name')
  //       this.formData.delete('isUpto')
  //       this.formData.delete('category')
  //       this.formData.delete('discount')
  //       this.formData.delete('type')
  //       this.formData.delete('country')
  //       return this.errorToast(response.message);
  //     }
  //     this.successToast('Sub category added successfully!');
  //     this.onAddEdit.emit();
  //     this.onCancel();
  //   }, error => {
  //     this.flags.isAdded = false;
  //   });
  // }

  // editSubCat() {
  //   if(this.body.name.trim()=="") return this.errorToast('Please enter name')
  //   this.flags.isUpdate = true;
  //   if (this.body.discount == '' || this.body.discount == null || this.body.discount == undefined) this.body.discount = '0'
  //   this.formData.append('category', this.body.category);
  //   this.formData.append('name', this.body.name);
  //   this.formData.append('country', this.country);
  //   this.formData.append('isUpto', JSON.stringify(this.body.isUpto));
  //   this.formData.append('discount', this.body.discount);
  //   this.formData.append('type', this.body.type);
  //   this.formData.append('id', this.subcategoryId)

  //   this.api.editSubCategory(this.formData).subscribe((response: Resp) => {
  //     this.flags.isUpdate = false;
  //     if (!response.success) {
  //       this.formData.delete('name')
  //       this.formData.delete('isUpto')
  //       this.formData.delete('category')
  //       this.formData.delete('discount')
  //       this.formData.delete('type')
  //       this.formData.delete('country')
  //       return this.errorToast(response.message);
  //     }
  //     this.successToast('Sub category updated successfully!');
  //     this.onAddEdit.emit(true);
  //     this.onCancel();
  //   }, error => {
  //     this.flags.isUpdate = false;
  //   });
  // }
  onImageRemove() {
    this.src = null;
    $('#subCategoryFile').val('');
  }
  onCancel() {
    this.src = null;
    this.file = null;
    this.flags.isEdit = false;
    $('#subCategoryFile').val('');
    this.body = new AddSubCategoryBody();
    this.body.category = '';
    this.formData = new FormData();
    document.getElementById('closeSubCategoryModal').click();
  }
  error = message => {
    this.errorToast(message);
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

