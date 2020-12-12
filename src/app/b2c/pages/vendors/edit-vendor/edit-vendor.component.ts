import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/b2c/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { VendorBody } from 'src/app/b2c/requests/vendor-body';
import base from 'src/app/b2c/services/api.service';
import { MapsAPILoader } from '@agm/core';
declare var google:any

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.scss']
})
export class EditVendorComponent implements OnInit {
  vendorId:any;
  history = window.history;
  body = new VendorBody();
  categoryList:any=[];
  defaultImage = "assets/img/defaultuser.jpg";
   flags = {
    isUpdate: false
  };
  src: any;
  file: File;
  fenceList:any;
  latitude:any;
  longitude:any;
  imageUrl = base;
  zoom: any=15;
  selectedMarker: { lat: any; lng: any; };
  markers:any=[];
  address: string;
  private geoCoder;
  formData = new FormData();

 
  singleDropDownSetting: any = {
    enableCheckAll: false,
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 1,
    allowSearchFilter: true
  };
  
  @ViewChild('search',{static: false})
  public searchElementRef: ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private toaster: ToastrManager,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) { }

  ngOnInit() {

  }

   // Get Current Location Coordinates
   private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position)
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
 
 
  markerDragEnd($event:any) {
    // console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
 
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      // console.log(results);
      // console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 15;
          this.body.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }



  

  getFenceList(){
    this.api.getAllGeofencingList().subscribe((response:any)=>{
      this.fenceList=response.data;
    })
  }

  getVendorDetail(){
    this.api.getVendorDetail(this.body.id).subscribe((response:any)=>{
       const data=response.user;
       this.src= this.imageUrl+data.photo;
       this.body.name=data.name;
       this.body.email=data.email;
       this.body.category=data.category.id;  
       this.body.fence=data.fence;
       this.body.address=data.vendordetail[0].address;
       this.body.bio=data.vendordetail[0].bio; 
       this.body.businessDetail=data.vendordetail[0].businessDetail;
       this.latitude=data.vendordetail[0].latitude;
       this.longitude=data.vendordetail[0].longitude;
    })
  }

  onImageSelect(e) {
    const file = e.target.files[0];
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.src = event.target.result;
      
      };
      reader.readAsDataURL(e.target.files[0]);
      this.file = file;
      this.formData.append('photo',this.file)
    } else {
      this.errorToast('Selected file is not image.');
    }
  }

  updateVendor(){
    // if(!this.file || !this.src) return this.errorToast('Please select image');
    if(!this.body.address) return this.errorToast('Please select valid address');
    if(this.latitude==null) return this.errorToast('Please select valid address');
    this.flags.isUpdate = true;

    this.formData.append('latitude',this.latitude);
    this.formData.append('longitude',this.longitude);
    for(let key in this.body){
      this.formData.append(`${key}`,this.body[key]);
    }

 
     this.api.updateVendor(this.formData).subscribe((response: any) => {  
      this.flags.isUpdate = false; 
       if (!response.success) {
         this.formData=new FormData();
         return this.errorToast(response.message);
       }
       this.successToast('Vendor updated successfully');
       this.formData=new FormData();
       this.getVendorDetail();
       }, error => {
        this.flags.isUpdate = false;
      });
   }

  //  handleAddressChange(address){
  //   this.body.address=address.formatted_address;
  //   this.body.latitude=address.geometry.location.lat();
  //   this.body.longitude=address.geometry.location.lng();
  // }
  

  successToast(message) {
    this.toaster.successToastr(message, '', {
      maxShown: 1
    });
  }

  errorToast(message) {
    this.toaster.errorToastr(message);
  }
}
