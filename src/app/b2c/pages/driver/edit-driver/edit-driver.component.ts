import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/b2c/services/api.service';
import { DriverBody } from 'src/app/b2c/requests/driver-body';
import base from 'src/app/b2c/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.scss']
})
export class EditDriverComponent implements OnInit {
  driverId: any;
  body = new DriverBody();
  imageUrl = base + "/";
  history = window.history;
  src1: any;
  src2: any;
  src3: any;
  file1: File;
  file2: File;
  file3: File;

  formData = new FormData;
  flags = {
    isUpdate: false,
    isImgUpload: false,
    isCombo: false
  };

  appCountry = ['india']


  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private router: Router, private toaster: ToastrManager) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      // console.log(params.id);
      this.driverId = params.id;
      this.getParticularDriver();
    });
  }

  getParticularDriver() {
    this.api.getParticularDriver(this.driverId).subscribe((response: any) => {
      this.body = response.data;
      this.src1 = this.imageUrl + response.data.documentOne
      this.src2 = this.imageUrl + response.data.documentTwo
      this.src3 = this.imageUrl + response.data.documentThree
      // console.log(this.body);
    })
  }

  editDriver() {
    this.flags.isUpdate = true;
    // this.formData.append('type', 'B2C');

    // console.log(this.body);
    this.formData.append('firstName', this.body.firstName)
    this.formData.append('lastName', this.body.lastName);
    this.formData.append('phone', this.body.phone)
    this.formData.append('city', this.body.city);
    this.formData.append('street', this.body.street);
    this.formData.append('country', this.body.country);
    this.formData.append('state', this.body.state);
    this.formData.append('pinCode', this.body.pinCode);
    this.formData.append('address', this.body.address);
    this.formData.append('bio', this.body.bio);
    this.formData.append('id', this.driverId);
    this.formData.append('appCountry', JSON.stringify(this.appCountry));
    this.formData.append('type', 'B2C');

    this.api.editDriver(this.formData).subscribe((response: any) => {
      this.flags.isUpdate = false;
      if (!response.success) {
        this.formData = new FormData();
        return this.errorToast(response.message);
      } else {
        this.successToast('Driver Edit successfully!');
        this.formData = new FormData();
      }
    }, error => {
      this.flags.isUpdate = false;
    });
  }


  onImageSelect1(e) {
    const file = e.target.files[0];
    this.formData.delete('image');
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.src1 = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.file1 = file;
      this.formData.append('documentOne', this.file1);
    } else {
      this.errorToast('Selected file is not image.');
    }
  }

  onImageSelect2(e) {
    const file = e.target.files[0];
    this.formData.delete('image');
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.src2 = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.file2 = file;
      this.formData.append('documentTwo', this.file2);
    } else {
      this.errorToast('Selected file is not image.');
    }
  }

  onImageSelect3(e) {
    const file = e.target.files[0];
    this.formData.delete('image');
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.src3 = event.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
      this.file3 = file;
      this.formData.append('documentThree', this.file3);
    } else {
      this.errorToast('Selected file is not image.');
    }
  }


  //get place 
  handleAddressChange(event) {
    // console.log(event);
    this.formData.append("lattitude", event.geometry.location.lat())
    this.formData.append("longitude", event.geometry.location.lng())
    this.body.address = event.formatted_address;
    // console.log(this.body.address);
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
