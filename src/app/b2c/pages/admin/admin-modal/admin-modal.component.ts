import { Component, OnInit, Input, Output, EventEmitter,ViewChild, ElementRef, NgZone} from '@angular/core';
 import { ApiService } from 'src/app/b2c/services/api.service';
import { Resp } from 'src/app/models/Resp';
import base from '../../../services/api.service'
import { AdminBody } from 'src/app/b2c/requests/sub-admin-body';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MapsAPILoader } from '@agm/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
declare var $: any;
declare var google:any
@Component({
  selector: 'app-admin-modal',
  templateUrl: './admin-modal.component.html',
  styleUrls: ['./admin-modal.component.scss']
})
export class AdminModalComponent implements OnInit {
  @ViewChild("search", { static: false }) public searchElementRef: ElementRef;

  @Output() onAddEdit = new EventEmitter();
  body=new AdminBody();
  imageUrl = base;
  lat: string;
  lng: string;
  zoom = 1;
  private geoCoder;
  country: any = "india"
  formData = new FormData();
  latitude:any;
  longitude:any;
  latlng = {};
  selectedMarker: { lat: any; lng: any; };
  markers:any=[];
  address: string;
  public checksearchElementRef: ElementRef;
  pickupAddress: any;
  currentStep: string;
  flags = {
    isAdded: false,
    isUpdate: false,
    isEdit: false
  };
  // tokenVal;

 
  superlist: any;
  auth: string;


  constructor(private api: ApiService, private toaster: ToastrManager,
    private mapsAPILoader: MapsAPILoader,private http: HttpClient,
    private ngZone: NgZone,) { this.auth = localStorage.getItem('supertoken') }

  ngOnInit() {
  //  this.superlist = JSON.parse(localStorage.getItem('Dayfresh_Admin'))._id
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
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

  addBranch(){
    
  }


  getmapaddress() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder;

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      console.log("---autocom--",autocomplete);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          const place = google.maps.places.PlaceResult = autocomplete.getPlace();
           console.log("--location--",place);
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
        this.latlng={lat:this.lat,lng:this.lng}
        this.getPickupAddress(this.latlng)
        });
      });
    });
  }

  getPickupAddress(latLng) {
    this.geoCoder.geocode({ 'location': { lat: latLng.lat, lng: latLng.lng } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 15;
          this.pickupAddress = results[0].formatted_address;
          this.currentStep = 'home';
        } else {
          console.log('location: No results found');
        }
      } else {
        // window.alert('Geocoder failed due to: ' + status);
        console.log('Geocoder failed due to:', status);
      }
    });
    // this.checkstatusMap();
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        this.body.latitude = position.coords.latitude;
        this.body.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.body.latitude, this.body.longitude);
      });
    }
  }

  editSubAdmin() {  
    if(this.body.latitude==null) return this.errorToast('Please select valid address');
    this.flags.isUpdate = true;
    this.api.updateAdmin(this.body).subscribe((response: Resp) => {
      this.flags.isUpdate = false;
      if (!response.success) {
        return this.errorToast(response.message);
      }
      this.successToast('Admin updated successfully!');
      this.onAddEdit.emit(true);
      this.onCancel();
    }, error => {
      this.flags.isUpdate = false;
    });
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

  onEditSelect(data) {
    
    this.flags.isEdit=true;
    // this.body.name=data.name;
    // this.body.email=data.email;
    // this.body.password = data.password;
    // this.body.address = data.address;
    // this.body.businessOwnerId = data.businessOwnerId
   // this.body.id = data.id;
    // this.getAddress(this.body.latitude,this.body.longitude)
    document.getElementById('openSubAdminModal').click();
  }

  addSubAdmin()
  {
    debugger
    this.body.latitude = 0;
    this.body.longitude = 0;

    const data = {
      "name":this.body.name,
      "email": this.body.email,
      "password":this.body.password,
      "longitude":0,
      "latutude":0,
      "address":this.body.address,
      "type":"Admin"
  }

  this.api.addAdmin(data).subscribe( (response:any) => {
      this.flags.isAdded = false;
      if (response.statusCode != 200) {
        return this.errorToast(response.message);
      }
      this.successToast('Admin added successfully!');
      this.onAddEdit.emit();
      this.onCancel();
    }, error => {
        this.flags.isAdded = false;
      });
  }

  onCancel() {
    this.flags.isEdit = false;
    this.body=new AdminBody();
    document.getElementById('closeSubAdminModal').click();
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
