import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/b2c/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import base from 'src/app/b2c/services/api.service';
import { AddSubCategoryBody } from '../../../requests/add-sub-category-body'
declare var $: any;

@Component({
  selector: 'app-categorymodal',
  templateUrl: './categorymodal.component.html',
  styleUrls: ['./categorymodal.component.scss']
})
export class CategorymodalComponent implements OnInit {
  @Input() isEdit: boolean;
  // @Input() imageUrl: string;
  @Output() onAddEdit = new EventEmitter();

  imageUrl = base;
  src: any;
  file: File;
  formData = new FormData();
  categoryName: string;
  isUpto: boolean = false;
  deliveryBy: string;
  discount: string;
  type: string = "";
  categoryId: any;
  flags = {
    isAdded: false,
    isUpdate: false
  };
  country = ["india"]

  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
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

  onImageRemove() {
    this.src = null;
    $('#categoryFile').val('');
  }

  onEditSelect(data) {
    this.categoryName = data.name;
    this.isUpto = data.isUpto;
    this.deliveryBy = data.deliveryBy;
    this.discount = data.discount;
    this.type = data.type;
    this.isEdit = true;
    this.src = `${this.imageUrl}/${data.image}`;
    this.categoryId = data._id
    // this.formData.append('id', data._id);
    document.getElementById('openCategoryModal').click();
  }

  addCategory() {
    // console.log(this.isUpto);
    if(this.categoryName.trim()=="") return this.errorToast('Please enter name')
    if (!this.file) return this.error('Please select image first.');
    if (this.discount == '' || this.discount == null || this.discount == undefined) this.discount = '0'
    this.flags.isAdded = true;
    this.formData.append('name', this.categoryName);
    this.formData.append('isUpto', JSON.stringify(this.isUpto));
    this.formData.append('deliveryBy', this.deliveryBy);
    this.formData.append('discount', this.discount);
    this.formData.append('type', this.type);
    this.formData.append('country', JSON.stringify(this.country))

    this.api.addCategory(this.formData).subscribe((response: any) => {
      this.flags.isAdded = false;
      if (!response.success) {
        this.formData.delete('name')
        this.formData.delete('isUpto')
        this.formData.delete('deliveryBy')
        this.formData.delete('discount')
        this.formData.delete('type')
        this.formData.delete('country')
        return this.errorToast(response.message);
      }
      this.onCancel();
      this.successToast('Category added successfully!');
      this.onAddEdit.emit(true);
    }, error => {
      this.flags.isAdded = false;
    });
  }

  editCategory() {
    if(this.categoryName.trim()=="") return this.errorToast('Please enter name')
    this.flags.isUpdate = true;
    if (this.discount == '' || this.discount == null || this.discount == undefined) this.discount = '0'
    this.formData.append('id', this.categoryId);
    this.formData.append('name', this.categoryName);
    this.formData.append('isUpto', JSON.stringify(this.isUpto));
    this.formData.append('deliveryBy', this.deliveryBy);
    this.formData.append('discount', this.discount);
    this.formData.append('type', this.type);
    this.formData.append('country', JSON.stringify(this.country))
    this.api.updateCategory(this.formData).subscribe((response: any) => {
      this.flags.isUpdate = false;
      if (!response.success) {
        this.formData = new FormData();
        return this.errorToast(response.message);
      }
      this.onCancel();
      this.successToast('Category updated successfully!');
      this.onAddEdit.emit(true);
    }, error => {
      this.flags.isUpdate = false;
    });
  }

  onCancel() {
    this.categoryName = '';
    this.deliveryBy = '';
    this.discount = '';
    this.type = '';
    this.file = null;
    this.src = null;
    $('#categoryFile').val('');
    this.formData = new FormData();
    this.isEdit = false;
    document.getElementById('closeCategoryModal').click();
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

