import { Component, OnInit } from '@angular/core';
import { DriverBody } from 'src/app/b2c/requests/driver-body';

import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ApiService } from 'src/app/b2c/services/api.service';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {
  history = window.history;
  body = new DriverBody();
  country: any;
  flags = {
    isAdded: false
  };
  appCountry = ['india']
  src1: any;
  src2: any;
  src3: any;
  file1: File;
  file2: File;
  file3: File;

  formData = new FormData();

  constructor(
    private api: ApiService,
    private router: Router,
    private toaster: ToastrManager
  ) { }

  ngOnInit() {
  }
  
  addDriver() {
    if (!this.file1) return this.errorToast('Please select Document 1.');
    if (!this.file2) return this.errorToast('Please select Document 2.');
    if (!this.file3) return this.errorToast('Please select Document 3.');
    // this.flags.isAdded = true;
    this.formData.append('type', 'B2C');
    this.formData.append('appCountry', JSON.stringify(this.appCountry))

    for (var key in this.body) {
      this.formData.append(key, this.body[key]);
    }

    this.api.addDriver(this.formData).subscribe((response: any) => {
      this.flags.isAdded = false;
      if (!response.success) {
        this.formData = new FormData();
        return this.errorToast(response.message);
      } else {
        this.successToast('Driver added successfully!');
        this.router.navigateByUrl('/b2c/drivers');
      }
    }, error => {
      this.flags.isAdded = false;
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

