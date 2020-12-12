import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/b2c/services/api.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MapsAPILoader } from '@agm/core';
import * as moment from 'moment';
declare var google:any


@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent implements OnInit {
  history = window.history;

  categoryList:any=[];
  defaultImage = "assets/img/defaultuser.jpg";
   flags = {
    isAdded: false
  };
  src: any;
  file: File;
  Rate:any;
  amount:any;
  fenceList:any;
  latitude: any;
  longitude: any;
  zoom: any=15;
  installment:any;
  startMinDate = moment(new Date()).subtract(1, 'd').format('YYYY-MM-DD')
  endDate :any;
  selectedMarker: { lat: any; lng: any; };
  markers:any=[];
  address: string;
  date:any;
  enddate:any;
  interest:any;
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
  borrowerid: any;
  ratetype: any;
  charges: any;
  description: any;
  category: any;
  borrowerdata: any;
  borrower: any;
  role: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private toaster: ToastrManager,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) { this.role = localStorage.getItem('role') }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => 
    {
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
  this.api.$borrowercheck.subscribe((res)=>
  {
    this.borrowerid = res;
  })
  this.getborrower()
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
 
  datepicker(e)
  {
    console.log(e)
    console.log(this.date)
    this.endDate = moment(this.date).add(this.installment, 'd').format('YYYY-MM-DD')
    this.enddate = this.endDate;
    //this.enddate = e.timeStamp;
    //this.date = e.timeStamp
  //  console.log(this.enddate)
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
         // this.body.address = results[0].formatted_address;
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

  addVendor() 
  {
  const data = 
  {
    "borrowerId": this.borrower,
    "loanCategory":this.category,
    "principleAmount":this.amount,
    "rateType": this.ratetype,
    "ratePerMonth":this.Rate,
    "maintenanceCharges":this.charges,
    "startDate": moment(this.enddate).valueOf() ,
    "endDate":moment(this.enddate).valueOf() ,
    "intrest":this.interest,
    "description":this.description
  }
  this.api.addLoan(data).subscribe((res:any)=>
  {
    if(res.statusCode == 200)
    {
      this.toaster.successToastr('Added successfully!')
      this.router.navigate(['/b2c/vendors'])
    }
  })
  }

  onImageSelect(e) {

  }
   
  successToast(message) {
    this.toaster.successToastr(message, '', {
      maxShown: 1
    });
  }

  errorToast(message) {
    this.toaster.errorToastr(message);
  }

  getinterestvalue()
  {
   console.log(this.Rate);
   console.log(this.amount)
   this.interest = (this.Rate / 100)*this.amount ;
  }

  getborrower()
  {
    this.api.getborrower().subscribe((res:any)=>
    {
      this.borrowerdata = res.data;
      console.log("borrower",res);
    })
  }

  changeWebsite(event)
  {
    this.borrower = event.target.value;
  }
  
}
