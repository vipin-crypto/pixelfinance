import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddBannerBody } from 'src/app/b2c/requests/add-banner-body';
import { ApiService } from 'src/app/b2c/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import base from 'src/app/b2c/services/api.service';
declare var $: any;

@Component({
  selector: 'app-banner-modal',
  templateUrl: './banner-modal.component.html',
  styleUrls: ['./banner-modal.component.scss']
})
export class BannerModalComponent implements OnInit {
  // @Input() imageUrl: string;
  @Input() couponList: Array<any>;
  @Input() detailsList: Array<any>;
  @Input() selectedBanner: any;
  @Input() brandList: Array<any>;
  @Output() onAddEdit = new EventEmitter();

  src: any;
  file: File;
  imageUrl = base;
  response: any;
  offerDetails = { category: '', subCategory: '' };

  addBannerBody = new AddBannerBody();
  categoryList: Array<any> = [];
  subCategories: Array<any> = [];
  productList: Array<any> = [];
  offerList: Array<any> = [];
  selectedCat: Array<any> = [];
  selectedBrand: Array<any> = [];
  selectedSubCat: Array<any> = [];
  selectedProduct: Array<any> = [];
  offerBody = { type: '', list: [] };
  bannerFor: any;
  formData = new FormData();
  flags = {
    isAdded: false,
    isUpdate: false,
    isEdit: false
  };

  dropDownSetting: any = {
    enableCheckAll: false,
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  singleDropDownSetting: any = {
    enableCheckAll: false,
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };


  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    this.addBannerBody.type = '';
    // this.addBannerBody.coupon = '';
  }
  async onEditSelect(data) {
    // console.log(data);
    this.flags.isEdit = true;
    this.addBannerBody = data;
    if (data.offer) {
      switch (data.offer.type) {
        case 'category':
          this.bannerFor = '1';
          this.categoryList.forEach(ele => {
            const index = data.offer.list.indexOf(ele.item_id);
            if (index > -1) {
              this.selectedCat.push(ele);
              this.offerBody = data.offer;
            }
          });
          break;
        case 'subCategory':
          this.bannerFor = '2';
          // console.log("ddt", data.offer);
          this.api.getallSubCategories(data.offer.list[0], 1).subscribe((response: any) => {
            // console.log(response);
            this.offerBody = data.offer;
            const subcat = data.categoriesId;
            // console.log(subcat);
            this.offerDetails.category = subcat;
            this.onChangeCategory(subcat, data);
          })

          // const subCat: any = await this.api.getallSubCategories(data.offer.list[0], 1);
          // this.offerBody = data.offer;
          // this.offerDetails.category = subCat.category;
          //  this.onChangeCategory(subCat.category, data);
          break;
        case 'product':
          this.bannerFor = '3';
          console.log("data", data);

          // this.api.getProductBySubCat({ subCategoryId: data.subcategoryId }).subscribe((response: any) => {
          //   console.log("product reposne", response);
          //   const product = response['data'];
          //   console.log("product", product);
          this.offerDetails = { category: data.categoryId, subCategory: data.subcategoryId };
          this.offerBody.list = data.offer.list;
          this.offerBody.type=data.offer.type;
          this.onChangeCategory(data.categoryId,data);
          this.onChangeSubCategory(data.subcategoryId, data);
          break;
        case 'brand':
          this.bannerFor = '4';
          this.brandList.forEach(ele => {
            const index = data.offer.list.indexOf(ele.item_id);
            if (index > -1) {
              this.selectedBrand.push(ele);
              this.offerBody = data.offer;
            }
          });
      }
    }
    this.src = `${this.imageUrl}/${data.image}`;
    this.formData.append('id', data._id);
    document.getElementById('openBannerModal').click();
  }

  emptyOfferbody() {
    this.offerBody = { type: '', list: [] };
  }

  onChangeCategory(id: string, data?) {
    console.log(id, data);
    const list = [];
    this.selectedSubCat = [];
    if (!data) {
      this.offerBody.list = []
    }

    const selected = [];
    this.api.getallSubCategories(id, {}).subscribe((response: any) => {
      if (!response.data.length) return;
      response.data.forEach(ele => {
        list.push({ item_id: ele._id, item_text: ele.name });
      });
      this.subCategories = list;
      if (data) {
        this.subCategories.forEach(ele => {
          const index = data.offer.list.indexOf(ele.item_id);
          if (index > -1) {
            selected.push(ele);
          }
        });
        this.selectedSubCat = selected;
      }
    });
  }

  onChangeSubCategory(id: string, data?) {
    const list = [];
    const selected = [];
    this.selectedProduct = []
    if (!data) {
      this.offerBody.list = []
    }
    this.api.getProductBySubCat({ subCategoryId: id }).subscribe((response: any) => {

      if (!response.data.length) return;
      response.data.forEach(ele => {
        list.push({ item_id: ele._id, item_text: ele.name });
      });
      this.productList = list;


      if (data) {
        this.offerDetails = { category: data.categoryId, subCategory: data.subcategoryId };
        // this.selectedProduct = [{ item_id: data._id, item_text: data.name }];

        this.productList.forEach(ele => {
          const index = data.offer.list.indexOf(ele.item_id);
          if (index > -1) {
            selected.push(ele);
          }
        });
        this.selectedProduct = selected;
      }
    });
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

  addBanner() {
    if(this.addBannerBody.name.trim()=="") return this.errorToast('Please enter Name')
    if (!this.file) return this.error('Please select image first.');
    if (!this.offerBody.list.length) return this.error('Please select offer first.');
    if (this.addBannerBody.discount == '' || this.addBannerBody.discount == null || this.addBannerBody.discount == undefined) this.addBannerBody.discount = '0'
    if (this.addBannerBody.discountType == '') this.addBannerBody.discountType = 'Percentage'
    this.flags.isAdded = true;
    this.formData.append('name', this.addBannerBody.name);
    this.formData.append('type', this.addBannerBody.type);
    this.formData.append('offer', JSON.stringify(this.offerBody));
    this.formData.append('discount', this.addBannerBody.discount);
    this.formData.append('discountType', this.addBannerBody.discountType)
    this.formData.append("country", JSON.stringify(this.addBannerBody.country))
    this.api.addBanner(this.formData).subscribe((response: any) => {
      this.flags.isAdded = false;
      if (!response.success) {
        this.formData.delete('name');
        this.formData.delete('type');
        this.formData.delete('offer');
        this.formData.delete('discount');
        this.formData.delete('discountType');
        this.formData.delete('country');
        return this.errorToast(response.message);
      }
      this.successToast('Banner added successfully!');
      this.onAddEdit.emit();
      this.onCancel();
    }, error => {
      this.flags.isAdded = false;
    });
  }

  editBanner() {
    if(this.addBannerBody.name.trim()=="") return this.errorToast('Please enter Name')
    if (!this.offerBody.list.length) return this.error('Please select offer first.');
    if (this.addBannerBody.discount == '' || this.addBannerBody.discount == null || this.addBannerBody.discount == undefined) this.addBannerBody.discount = '0'
    this.flags.isUpdate = true;
    this.formData.append('name', this.addBannerBody.name);
    this.formData.append('type', this.addBannerBody.type);
    this.formData.append('offer', JSON.stringify(this.offerBody));
    this.formData.append('discount', this.addBannerBody.discount.toString());
    this.formData.append('discountType', this.addBannerBody.discountType)
    // if (this.addBannerBody.type == 'Coupon') this.formData.append('coupon', this.addBannerBody.coupon);
    this.api.editBanner(this.formData).subscribe((response: any) => {
      this.flags.isUpdate = false;
      if (!response.success) {
        this.formData.delete('name');
        this.formData.delete('type');
        this.formData.delete('offer');
        this.formData.delete('discount');
        this.formData.delete('discountType');
        this.formData.delete('country');
        return;
      }
      this.successToast('Banner updated successfully!');
      this.onAddEdit.emit();
      this.onCancel();
    }, error => {
      this.flags.isUpdate = false;
    });
  }

  onImageRemove() {
    this.src = null;
    $('bannerImage').val('');
  }
  onCancel() {
    this.src = null;
    this.file = null;
    this.flags.isEdit = false;
    this.addBannerBody = new AddBannerBody();
    this.addBannerBody.discountType = '';
    this.addBannerBody.type = '';
    this.addBannerBody.coupon = '';
    this.bannerFor = '';
    this.offerBody = { type: '', list: [] };
    this.selectedCat = [];
    this.selectedSubCat = [];
    this.selectedProduct = [];
    this.selectedBrand = [];
    $('#bannerImage').val('');
    this.formData = new FormData();
    document.getElementById('closeBannerModal').click();
  }

  onDeSelect(item: any, type: number) {
    let index;
    switch (type) {
      case 1:
        index = this.offerBody.list.indexOf(item.item_id);
        break;
      case 2:
        index = this.offerBody.list.indexOf(item.item_id);
        break;
      case 3:
        index = this.offerBody.list.indexOf(item.item_id);
        break;
      case 4:
        index = this.offerBody.list.indexOf(item.item_id);
    }
    if (index > -1) this.offerBody.list.splice(index, 1);
  }

  onItemSelect(item: any, type: number) {
    switch (type) {
      case 1:
        this.offerBody.type = 'category';
        this.offerBody.list.push(item.item_id);
        break;
      case 2:
        this.offerBody.type = 'subCategory';
        this.offerBody.list.push(item.item_id);
        break;
      case 3:
        this.offerBody.type = 'product';
        this.offerBody.list.push(item.item_id);
        break;
      case 4:
        this.offerBody.type = 'brand';
        this.offerBody.list = [item.item_id];
        break;
    }
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
