import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/b2c/services/api.service';
import base from 'src/app/b2c/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ThemePalette } from '@angular/material/core';


@Component({
  selector: 'app-new-order-modal',
  templateUrl: './new-order-modal.component.html',
  styleUrls: ['./new-order-modal.component.scss']
})
export class NewOrderModalComponent implements OnInit {
  @Input() driverList: Array<any>;
  @Input() productList: Array<any>;
  @Input() deliveryAddress: any;
  @Input() driverDetail: any;
  @Input() requestId: string;
  @Output() onDriverAssign = new EventEmitter();
  imageUrl: string;
 
  body = { requestId: '', driverId: '' };
  flags = {
    isAssigned: false
  };

  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    this.imageUrl = base;
    // console.log(this.productList);

  }
  assignDriver() {
    this.flags.isAssigned = true;
    this.body.requestId = this.requestId;
    // console.log(this.body);
    // this.api.assignDriver(this.body).subscribe((response: any) => {
    //   this.flags.isAssigned = false;
    //   if (!response.success) return;
    //   this.successToast('Driver assigned successfully!');
    //   this.body = {requestId: '' , driverId: ''};
    //   this.onDriverAssign.emit();
    //   document.getElementById('closeDriverAssignModal').click();
    // }, error => {
    //   this.flags.isAssigned = false;
    // });
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
