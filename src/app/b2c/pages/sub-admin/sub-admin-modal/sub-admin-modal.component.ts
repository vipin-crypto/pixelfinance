import { Component, OnInit, Input, Output, EventEmitter,ViewChild, ElementRef, NgZone} from '@angular/core';
 import { ApiService } from 'src/app/b2c/services/api.service';
import { Resp } from 'src/app/models/Resp';
import base from '../../../services/api.service'
import { SubAdminBody } from 'src/app/b2c/requests/sub-admin-body';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MapsAPILoader } from '@agm/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
declare var $: any;
declare var google:any


@Component({
  selector: 'app-sub-admin-modal',
  templateUrl: './sub-admin-modal.component.html',
  styleUrls: ['./sub-admin-modal.component.scss'],

})
export class SubAdminModalComponent implements OnInit {
  @Input() fenceList:any=[];
  @Output() onAddEdit = new EventEmitter();
  body=new SubAdminBody();
  imageUrl = base;
  @Input() documents: any;
  //imageUrl = base + "/";
  history = window.history;
  src1: any;
  src2: any;
  src3: any;
  photosArr = []
  photosArrFile = []
  file1: File;
  imgUrl:any;
  file2: File;
  file3: File;
  country: any = "india"
  formData = new FormData();
  latitude:any;
  longitude:any;
  zoom: any=15;
  selectedMarker: { lat: any; lng: any; };
  markers:any=[];
  address: string;
  adhar: any;
  checkdoc: any;
  Pandoc: any;
  Imagedoc: any;
  electricdoc: any;
  affidavitedoc: any;
  private geoCoder;
  flags = {
    isAdded: false,
    isUpdate: false,
    isEdit: false
  };
  // tokenVal;
  @ViewChild('stepper',{static: false}) stepper: MatStepper;
  @ViewChild('search',{static: false})
  public searchElementRef: ElementRef;
  role: any;
  bussines_id: any;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  documentdata: any;
 
  constructor(private api: ApiService, private toaster: ToastrManager,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private _formBuilder: FormBuilder) { 
    // this.role=JSON.parse(localStorage.getItem('Dayfresh_Admin'));
    // this.bussines_id = this.role._id; 
    this.imgUrl = 'http://3.138.141.253:3000'
  }

  ngOnInit() {
     console.log("checkdocs",this.documents)
    this.firstFormGroup = this._formBuilder.group({
      Name: ['', Validators.required],
      Address: ['',Validators.required],
      age:['',Validators.required],
    //  upi:[''],
      Schedule: [''],
      bussiness: ['',Validators.required],
      home:['',Validators.required],
      mobile:['',Validators.required],
      alternate: ['',Validators.required],
    });
    
    this.secondFormGroup = this._formBuilder.group({
      sName: ['', Validators.required],
      sAddress: ['',Validators.required],
      sage:['',Validators.required],
      supi:['',Validators.required],
      salternate: ['',Validators.required],
      sbussiness: ['',Validators.required],
      smobile: ['',Validators.required],
      shome: ['',Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      
    })

    
     this.body.businessOwnerId = this.bussines_id
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
          // this.getAddress(this.latitude,this.longitude);
        });
      });
    });
   
    // this.tokenVal = JSON.parse(localStorage.getItem('token'));
  }

  onsubmitborrower()
  {
      
  }


  onEditSelect(data) {
    this.flags.isEdit=true;
    // this.body.name=data.name;
    // this.body.email=data.email;
    // this.body.address=data.address;
    // this.body.latitude=data.latitude;
    // this.body.longitude=data.longitude;
    // this.body.fence=data.fence.id;
    // this.body.id=data._id;
   // this.getAddress(this.body.latitude,this.body.longitude)
    document.getElementById('openSubAdminModal').click();
  }

   // Get Current Location Coordinates
   private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position)
        this.body.latitude = position.coords.latitude;
        this.body.longitude = position.coords.longitude;
        this.zoom = 15;
        // this.getAddress(this.body.latitude, this.body.longitude);
      });
    }
  }
 

  onSubmitFirst()
  {
    if(this.firstFormGroup.valid)
    {
      this.stepper.selected.completed = true;
      this.stepper.next();
    }
    else{
      this.stepper.selected.completed = false;
      this.stepper.previous();
    }
  }
 
  markerDragEnd($event:any) {
    // console.log($event);
    this.body.latitude = $event.coords.lat;
    this.body.longitude = $event.coords.lng;
    // this.getAddress(this.body.latitude, this.body.longitude);
  }

  selectImage(files: any, index: number,key) {
    console.log(key);
    switch (key) {
      case 1:
        if (files.length === 0)
        return;
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.Imagedoc = reader.result;
        // if (this.photosArr.length < index) {
        //   this.photosArr.push({ type: 0, img: reader.result })
        //   this.photosArrFile.push(files[0])
        // }
        // else {
        //   this.photosArr[1] = { type: 0, img: reader.result }
        //   this.photosArrFile[1] = files[0]
        // }
      }
        break;
    
      case 2: 
        if (files.length === 0)
        return;
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.adhar = reader.result;
      }
      break;

      case 3:

        if (files.length === 0)
        return;
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.Pandoc = reader.result;
      }

      break;

      case 4:

      if (files.length === 0)
        return;
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.checkdoc = reader.result;
      }

      break;
      case 5:

        if (files.length === 0)
          return;
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
          this.electricdoc = reader.result;
        }
  
        break;
        case 6:

          if (files.length === 0)
            return;
          var reader = new FileReader();
          reader.readAsDataURL(files[0]);
          reader.onload = (_event) => {
            this.affidavitedoc = reader.result;
          }
    
          break;

      default:
        break;
    }
   
  }
 
  numbercheck(event)
  {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode > 65 && charCode < 90) || (charCode > 97 && charCode < 122)) {
      return false;
    }
      return true;
  }


  // getAddress(latitude, longitude) {
  //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 15;
  //         this.body.address = results[0].formatted_address;
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }
 
  //   });
  // }

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

  // onImageSelect(e) {
  //   const file = e.target.files[0];
  //   this.formData.delete('image');
  //   if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
  //     const reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       this.src = event.target.result;
  //     };
  //     reader.readAsDataURL(e.target.files[0]);
  //     this.file = file;
  //     this.formData.append('image', this.file);
  //   } else {
  //     this.error('Selected file is not image.');
  //   }
  // }

  addBorrower() {
 console.log(this.firstFormGroup)
    const data =
    {
      "name":this.firstFormGroup.value.name,
      "email":'',
      "phoneNo":this.firstFormGroup.value.phone,
      "upiAddress":this.firstFormGroup.value.upi,
      "scheduleTime":this.firstFormGroup.value.name,
      "bussiness":this.firstFormGroup.value.bussiness,
      "refrenceEmail":this.secondFormGroup.value.name, 
      "address":this.firstFormGroup.value.Address,
      "panCard":this.Pandoc,
      "adharCard":this.adhar,

  }
    this.api.addBorrower(data).subscribe((res:any)=>
    {
     console.log(res);
    })
  }

  editSubAdmin() {  
    if(this.body.latitude==null) return this.errorToast('Please select valid address');
    this.flags.isUpdate = true;
    this.api.updateAdmin(this.body).subscribe((response: Resp) => {
      this.flags.isUpdate = false;
      if (!response.success) {
        return this.errorToast(response.message);
      }
      this.successToast('Sub Admin updated successfully!');
      this.onAddEdit.emit(true);
      this.onCancel();
    }, error => {
      this.flags.isUpdate = false;
    });
  }

  // onImageRemove() {
  //   this.src = null;
  //   $('#subCategoryFile').val('');
  // }

  handleAddressChange(address){
    console.log(address);
    this.body.address=address.formatted_address;
    this.body.latitude=address.geometry.location.lat();
    this.body.longitude=address.geometry.location.lng();
  }

  onCancel() 
  {
    this.flags.isEdit = false;
    this.body=new SubAdminBody();
    document.getElementById('closeSubAdminModal').click();
  }
  error = message => {
    this.errorToast(message);
  }

  successToast(message) 
  {
    this.toaster.successToastr(message, '', {
      maxShown: 1
    });
  }

  errorToast(message) 
  {
    this.toaster.errorToastr(message);
  }
  

  getAddress(data)
  {
 console.log("checdoc",data.panCard);
 this.documentdata = data;
  }

}

