import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { ApiService } from '../../services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

declare var google:any
 
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})

export class SettingComponent implements OnInit {
  flags = {
    isUpdate: false,
    isImgUpload: false,
    isCombo: false
  };
   vat: any
  subCategory: any
  subCategoryList: any
  discount: any;
  tokenVal: any;
  area: any = ''
  block: any = ''
  index: any = ''
  QualityIndex: any = [];
  blockList: any = [];
  areaList: any = [];
  setting: any;
  id: any;
  role: any;
  access: any;
  selectArea:any;
  selectBlock:any;
  latitude: any;
  longitude: any;
  zoom: any=15;
  selectedMarker: { lat: any; lng: any; };
  markers:any=[];
  address: string;
  private geoCoder;
   

  @ViewChild('search',{static: false})
  public searchElementRef: ElementRef;
 
  constructor(private api: ApiService, private toaster: ToastrManager,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private router:Router ) { }

  ngOnInit() {
    this.role=JSON.parse(localStorage.getItem('Dayfresh_Admin'));
    this.access=JSON.parse(localStorage.getItem('permission'));
    this.getSettingData();
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
 
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          
          let place: any= autocomplete.getPlace();
          
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
          
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
          this.getAddress(this.latitude,this.longitude);
        });
      });
    });
  }
 
  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
 
 
  markerDragEnd($event: MouseEvent) {
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
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
 
    });
  }

  
 
  // setCurrentLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       // console.log("name", position);
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 11;
  //       // this.getAddress(this.latitude, this.longitude);
  //     });
  //   }
  // }

   

  getSettingData() {
    this.api.getSettingData().subscribe((response: any) => {
      // console.log("dryyinhfsys",response);
      this.areaList = response.data.areaList;
      this.blockList = response.data.blockList;    
      this.latitude=response.data.latitude;
      this.longitude=response.data.longitude;
      this.setting = response.data;
      this.setting.deliveryFee=this.setting.deliveryFee.toFixed(3);
      this.setting.minOrderAmount=this.setting.minOrderAmount.toFixed(3);
      this.getAddress(this.latitude,this.longitude)
    })
  }

  updateSetting() {
    // console.log(this.setting);
    this.setting.id = this.setting._id

    this.api.updateSettingData(this.setting).subscribe((response: any) => {
      // console.log(response);
      this.flags.isUpdate = false;
      if (!response.success) return this.errorToast(response.message)
      this.successToast("Updated Successfully");
    }, error => {
      this.flags.isUpdate = false;
    })
  }

  addAddress(){
    // console.log(this.setting)
    this.setting.id = this.setting._id
    this.setting.latitude=this.latitude;
    this.setting.longitude=this.longitude;
    this.api.updateSettingData(this.setting).subscribe((response: any) => {
      // console.log(response);
      this.flags.isUpdate = false;
      if (!response.success) return this.errorToast(response.message)
      this.successToast("Updated Successfully");
    }, error => {
      this.flags.isUpdate = false;
    })
  }


  addBlock() {
    if (this.block.trim() == '')
      return this.errorToast('Enter Block')
    this.setting.id = this.setting._id
    if(this.selectBlock){
      const index= this.setting.blockList.indexOf(this.selectBlock);
      if(this.setting.blockList.indexOf(this.block)==-1){
      this.setting.blockList[index]=this.block;
      }
    }
    else{
      if(this.setting.blockList.indexOf(this.block)==-1) this.setting.blockList.push(this.block)
    }
   
     this.api.updateSettingData(this.setting).subscribe((response: any) => {
      if (response.success)
        // this.QualityIndex = response.data.QualityIndex;
        this.areaList = response.data.areaList;
      this.blockList = response.data.blockList
      this.setting = response.data
      this.successToast('Updated Successfully!');
      this.block = '';
    })
  }

  addArea() {
    if (this.area.trim() == '')
      return this.errorToast('Enter Area')
    this.setting.id = this.setting._id;
    if(this.selectArea){
      const index= this.setting.areaList.indexOf(this.selectArea);
      if(this.setting.areaList.indexOf(this.area)==-1){
      this.setting.areaList[index]=this.area;
      }
    }
    else {
     if (this.setting.areaList.indexOf(this.area)==-1) this.setting.areaList.push(this.area)
    // console.log(this.setting, "settindata")
    }
    this.api.updateSettingData(this.setting).subscribe((response: any) => {
      if (response.success)
        // this.QualityIndex = response.data.QualityIndex;
        this.areaList = response.data.areaList;
      this.blockList = response.data.blockList
      this.setting = response.data 
      this.successToast('Updated Successfully!');
      this.area = '';
    });
  }

 
  editArea(data){
    // console.log(data);
    this.area=data;
    this.selectArea=data;    
  }

  editBlock(data){
    // console.log(data);
    this.block=data;
    this.selectBlock=data;    
  }

  //delete area
  deleteArea(area) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this area!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        let index = this.areaList.indexOf(area);
      this.areaList.splice(index, 1)
       this.setting.id = this.setting._id
        this.api.updateSettingData(this.setting).subscribe((response: any) => {
          if (!response.success) return;
          this.areaList = response.data.areaList;
          this.blockList = response.data.blockList;
          this.setting = response.data;
          this.area = '';
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Your area has been deleted!',
            icon: 'success'
          })
          
        })
      }
    })
  }

  deleteBlock(block){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this block!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085D6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        let index = this.blockList.indexOf(block);
      this.blockList.splice(index, 1)
       this.setting.id = this.setting._id
        this.api.updateSettingData(this.setting).subscribe((response: any) => {
          if (!response.success) return;
          this.areaList = response.data.areaList;
          this.blockList = response.data.blockList;
          this.setting = response.data;
          this.area = '';
          Swal.fire({
            title: 'Deleted!',
            text: 'Poof! Your block has been deleted!',
            icon: 'success'
          })         
        })
      }
    })
  }

  successToast(message) {
    this.toaster.successToastr(message , ' ',
     {maxShown:1}
    )}

  errorToast(message) {
    this.toaster.errorToastr(message);
  }

}
