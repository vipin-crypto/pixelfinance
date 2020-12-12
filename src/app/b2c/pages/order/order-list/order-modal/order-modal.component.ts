import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/b2c/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss']
})
export class OrderModalComponent implements OnInit {

  @Input() deliveryAddress: any;
  @Input() productList: any;
  @Input() packList: any;
  @Input() driverList: any;
  @Input() driverDetail: any;
  @Input() requestId: string;
  // @Input() TransactionId:string;
  @Output() onDriverAssign = new EventEmitter();
  role:any;
  // geofenceId:any;
  imageUrl: string;
  body = { id: '', driver: '' };
  flags = {
    isAssigned: false
  };
  driverId: any = 0;

  constructor(private api: ApiService, private toaster: ToastrManager) { }

  ngOnInit() {
    // this.imageUrl = this.url.imageUrl;
    this.role=JSON.parse(localStorage.getItem('Dayfresh_Admin'));
    // this.geofenceId=this.api.getGeofenceId()
    this.getDriver();
      
    
  }

  getDriver() {
    let geofence=localStorage.getItem('geofenceId');
    console.log('geofence',geofence);
    this.api.getAllDrivers(geofence).subscribe((res) => {
      if (res['success'] == true) {
        const list = res['data'];
        this.driverList = list;
        // console.log("driver", this.driverList)
      }
    })
  }

  assignDriver() {
    this.flags.isAssigned = true;
    // console.log(this.requestId);
    this.body.id = this.requestId;
    // console.log(this.body, "==========")
    this.api.assignDriver(this.body).subscribe((response: any) => {
      this.flags.isAssigned = false;
      if (!response.success) return;
      this.successToast('Driver assigned successfully!');
      this.body = { id: '', driver: '' };
      this.api.processOrder({ id: this.requestId, status: 'Shipped' }).subscribe((response: any) => {
        if (!response.success) return this.errorToast(response.message)
        this.successToast('status updated successfully')
        this.onDriverAssign.emit();
      })
      document.getElementById('closeDriverAssignModal').click();
    }, error => {
      this.flags.isAssigned = false;
    });
  }

  assignDriverToAll() {
    this.flags.isAssigned = true;
    // console.log(this.requestId);
    this.body.id = this.requestId;
    // console.log(this.body, "==========")
    this.api.assignDriverToAll(this.body).subscribe((response: any) => {
      this.flags.isAssigned = false;
      if (!response.success) return;
      this.successToast('Driver assigned successfully!');
      this.body = { id: '', driver: '' };
      this.api.acceptTransaction({ transactionId: this.requestId, status: 'Shipped',adminId:this.role._id }).subscribe((response: any) => {
        if (!response.success) return this.errorToast(response.message)
        this.successToast('status updated successfully')
        this.onDriverAssign.emit();
      })
      document.getElementById('closeDriverAssignModals').click();
    }, error => {
      this.flags.isAssigned = false;
    });
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
