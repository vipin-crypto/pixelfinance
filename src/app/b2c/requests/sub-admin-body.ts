export class SubAdminBody {
  id:string;
  name:string;
  email:string;
  password:string;
  type:string='SubAdmin';
  fence:string='';
  address:string;
  latitude:any;
  longitude:any;
  businessOwnerId:any;
  isDeleted:boolean;
  isBlocked:boolean
  phone:any;
  Address:string;
  Gender:string
}

export class AdminBody{
  email:string;
  name:string;
  password:string;
  type:'Admin';
  address:string;
  latitude:any;
  longitude:any;
}