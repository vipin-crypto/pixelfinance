import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginBody } from 'src/app/b2b/requests/login-body';
import { ProductBody } from '../requests/product-body';
import { PackBody } from '../requests/pack-body';
import io from 'socket.io-client';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable, BehaviorSubject } from 'rxjs';


let base = '';

export default base = "http://appgrowthcompany.com:5005";

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    socket;
    adminId;
    imageUrl = "http://appgrowthcompany.com:5005";
    baseUrl = "http://3.138.141.253:3000";
    socketUrl = "http://appgrowthcompany.com:5005/";

    countran = new BehaviorSubject('');
    $countryint = this.countran.asObservable();
    public brrowercheck = new BehaviorSubject('');
    $borrowercheck = this.brrowercheck.asObservable();
    constructor(private http: HttpClient,private toaster: ToastrManager) {
        // let adminDetail = JSON.parse(localStorage.getItem('Dayfresh_Admin'));
        // this.adminId=adminDetail._id;
        // this.socket = io(this.socketUrl);
    
     }

    
     newOrder() { 
        return Observable.create(observer => {
        var data = 'newOrder'+this.adminId;
        this.socket.removeListener(data);
          this.socket.on(data, data => {         
              console.log(data); 
              observer.next(data);        
          });       
        });
      }

      setGeofenceId(id){
        //   console.log(id);
        localStorage.setItem('geofenceId',id);
        //  this.geofenceId=id;
      }

    singIn(body: LoginBody) {
        return this.http.post(`${this.baseUrl}api/admin/login`, body);
    }

   //Dashboard api
    getdashboardData() {
        return this.http.get(`${this.baseUrl}/api/admin/dashboard`)
    }

    getRevenueData(body){
        return this.http.post(`${this.baseUrl}/api/admin/revenue`,body)
    }

    getAreaSales(body){
        return this.http.post(`${this.baseUrl}/api/admin/area-wise-sales`,body)
    }

    /**Get all admin details**/
    getAdminDetail(id,count)
    {
    const data =
    {
        "superAdminId":id,
        "page":count
    }
  return this.http.post(`${this.baseUrl}/api/super_admin/get_admin_details`,data)
}

    /**Delete Image */
    deleteImage(id) {
        return this.http.delete(`${this.baseUrl}/api/admin/delete-image?id=${id}`)
    }

    getAllgraphdata()
    {
        const data = {}
     return this.http.post(`${this.baseUrl}/api/v1/superAdmin/graph`,data)
    }

    transfercount(count)
    {
        this.countran.next(count)
    }
    //sub admin api
    getSubAdmin(page,id){
        return this.http.get(`${this.baseUrl}/api/v1/superAdmin/addAdmin?id=${id}&page=${page}`)
    }
    getSubAdminDetail(id){
        return this.http.get(`${this.baseUrl}/api/admin/subAdmin/${id}`)
    }
    addSubAdmin(body){
        return this.http.post(`${this.baseUrl}/api/addSubAdmin`, body)
    }
    updateAdmin(body){
        return this.http.put(`${this.baseUrl}/api/super_admin/update_admin_details`, body)
    }

    getAdmindeatials()
    {
    //    var token =  localStorage.getItem('supertoken')
    //     const header = new Headers();
    //     header.set('Authorization',token)
    const data =
    {}
        return this.http.post(`${this.baseUrl}/api/v1/superAdmin/getAllAdminProfile`,data);
    }
    addBorrower(data)
    {
        return this.http.post(`${this.baseUrl}/api/v1/superAdmin/addBorrower`,data)
    }

    getborrower()
    {
        // var token =  localStorage.getItem('supertoken')
        // const header = new Headers();
        // header.set('Authorization',token)
        const data ={}
        return this.http.post(`${this.baseUrl}/api/v1/superAdmin/adminAllBorrower`,data)
    }

    verifyborrowerSper(data)
    {
        return this.http.post(`${this.baseUrl}/api/v1/superAdmin/verifyBorrower`,data)
    }

    getverifiedborrower()
    {
        const data ={}
        return this.http.get(`${this.baseUrl}/api/v1/superAdmin/getVerifiedBorrower`)
    }

    getallsuperadminborrower()
    {
        return this.http.get(`${this.baseUrl}/api/v1/superAdmin/superAdminAllBorrower`) 
    }

    getadminborrowerloan()
    {
       
        return this.http.get(`${this.baseUrl}/api/v1/superAdmin/getAdminApprovedBorrower`)
    }
    addAdmin(data)
    {
       return this.http.post(`${this.baseUrl}/api/v1/superAdmin/addAdmin`,data)
    }

    deleteSubAdmin(data){
        return this.http.post(`${this.baseUrl}/api/v1/superAdmin/deleteBorrower`,data)
    }
    
    subAdminPermission(body){
        return this.http.post(`${this.baseUrl}/api/admin/permission`, body)
    }

    //all api
    getAllborrower(){
        const data = {}
        return this.http.get(`${this.baseUrl}/api/v1/superAdmin/getVerifiedBorrower`)
    }
    getVendorDetail(id){
        return this.http.get(`${this.baseUrl}/api/admin/vendor/${id}`)
    }
    addVendor(body){
        return this.http.post(`${this.baseUrl}/api/admin/vendor`, body)
    }
    updateVendor(body){
        return this.http.put(`${this.baseUrl}/api/admin/vendor`, body)
    }
    getVendorProduct(page,id){
        return this.http.get(`${this.baseUrl}/api/admin/vendor-product?page=${page}&vendorId=${id}`)
    }

    deleteVendor(id){
        return this.http.delete(`${this.baseUrl}/api/admin/vendor/${id}`)
    }

   addLoan(data)
   {
       return this.http.post(`${this.baseUrl}/api/v1/superAdmin/addLoan`,data);
   }

    //users api
    getallUsers(data) 
    {
        return this.http.post(`${this.baseUrl}/api/admin/user`, data)
    }

    getUserDetail(id) 
    {
        return this.http.get(`${this.baseUrl}/api/admin/user?id=${id}`)
    }

    updateUser(body) 
    {
        return this.http.post(`${this.baseUrl}/api/admin/update-user`, body)
    }

    generateUserCsv()
    {
     return this.http.get(`${this.baseUrl}/api/admin/generateUserCSV`)
    }

    getUserOrders(id)
    {
        return this.http.get(`${this.baseUrl}/api/admin/user-orders?userId=${id}`)
    }

    deleteUser(id) 
    {
        return this.http.delete(`${this.baseUrl}/api/admin/delete-user?id=${id}`)
    }

    //category api
    addExpanses(data) 
    {
        return this.http.post(`${this.baseUrl}/api/v1/superAdmin/addExpenses`,data)
    }

    getexapnses()
    {
        return this.http.get(`${this.baseUrl}/api/v1/superAdmin/getExpenses`);
    }

    addCategory(body) 
    {
        return this.http.post(`${this.baseUrl}/api/admin/category`, body)
    }

    updateCategory(body) 
    {
        return this.http.put(`${this.baseUrl}/api/admin/category`, body)
    }

    deleteCategory(id) {
        return this.http.delete(`${this.baseUrl}/api/admin/category?id=${id}`)
    }

    //sub-category api
    getallSubCategories(categoryid, page) 
    {
        return this.http.get(`${this.baseUrl}/api/admin/sub-category?category=${categoryid}&page=${page}`)
    }

    // addSubCategory(body) {
    //     return this.http.post(`${this.baseUrl}/api/admin/sub-category`, body);
    // }
   transferboower(id)
   {
       this.brrowercheck.next(id);
   }

    deleteSubCategory(id) {
        return this.http.delete(`${this.baseUrl}/api/admin/sub-category?id=${id}`)
    }

    //banner api
    getallBanners(page) {
        return this.http.get(`${this.baseUrl}/api/admin/banner?page=${page}`)
    }

    addBanner(body) {
        return this.http.post(`${this.baseUrl}/api/admin/banner`, body);
    }

    editBanner(body) {
        return this.http.put(`${this.baseUrl}/api/admin/banner`, body);
    }

    deleteBanner(id) {
        return this.http.delete(`${this.baseUrl}/api/admin/banner?id=${id}`)
    }

    /**expanses api */
    getallExpanses() {
        return this.http.get(`${this.baseUrl}/api/v1/superAdmin/getAllExpenses`)
    }


    /**orders api */
    getAllOrders(data) {
        return this.http.post(`${this.baseUrl}/api/admin/orders`, data)
    }

    getTransactionOrders(body) {
        return this.http.post(`${this.baseUrl}/api/admin/transaction-orders`, body)
    }

    processOrder(body) {
        return this.http.post(`${this.baseUrl}/api/admin/process-order`, body)
    }

    assignDriver(body) {
        return this.http.post(`${this.baseUrl}/api/admin/assign_driver`, body)
    }

    assignDriverToAll(body){
        return this.http.post(`${this.baseUrl}/api/admin/assign-driver-to-all`, body)
    }

    acceptTransaction(body){
        return this.http.post(`${this.baseUrl}/api/admin/accept-transaction`,body)
    }

    generateInvoice(id){
        return this.http.get(`${this.baseUrl}/api/admin/generate-invoice?id=${id}`)
        }

    //product api
    getallProducts(page,search,type,id,cat) {
        return this.http.get(`${this.baseUrl}/api/admin/product?page=${page}&search=${search}&type=${type}&userId=${id}&category=${cat}`);
    }

    getParticularProduct(id) {
        return this.http.get(`${this.baseUrl}/api/admin/product-detail?id=${id}`)
    }

    addProduct(body) {
        return this.http.post(`${this.baseUrl}/api/admin/product`, body);
    }

    updateProduct(body) {
        return this.http.put(`${this.baseUrl}/api/admin/product`, body)
    }

    deleteProduct(id) {
        return this.http.delete(`${this.baseUrl}/api/admin/product?id=${id}`)
    }

    changeProductStatus(body) {
        return this.http.post(`${this.baseUrl}/api/admin/change-status`, body);
    }

    getProductBySubCat(id) {
        return this.http.post(`${this.baseUrl}/api/admin/product-by-reference`, id);
    }

    uploadProductBulk(data) {
        return this.http.post(`${this.baseUrl}/api/admin/bulk-upload`, data);
    }

    generateProductCsv(){
        return this.http.get(`${this.baseUrl}/api/admin/generateProductCSV`)
    }

    approveProduct(data){
        return this.http.post(`${this.baseUrl}/api/admin/approve-product`,data)
    }

    /**pack api */
    addPack(body: PackBody) {
        return this.http.post(`${this.baseUrl}/api/admin/add-product-pack`, body);
    }

    getallPacks(id) {
        return this.http.get(`${this.baseUrl}/api/admin/pack?id=${id}`)
    }

    getPackDetails(id) {
        return this.http.get(`${this.baseUrl}/api/admin/pack-detail?id=${id}`)
    }

    updatePackDetails(body) {
        return this.http.put(`${this.baseUrl}/api/admin/edit-product-pack`, body)
    }
    deletePack(id) {
        return this.http.delete(`${this.baseUrl}/api/admin/pack?id=${id}`)
    }

    uploadPackBulk(file) {
        return this.http.post(`${this.baseUrl}/api/admin/bulk-upload-pack`, file);
    }

    //Inventory pack api
    getPackInventory(page,search,type,id) {
        return this.http.get(`${this.baseUrl}/api/admin/inventory?page=${page}&search=${search}&type=${type}&userId=${id}`)
    }

    /**Driver Api */
    getDrivers(page, search) {
        return this.http.get(`${this.baseUrl}/api/admin/drivers?page=${page}&search=${search}`)
    }

    getAllDrivers(fence){
        return this.http.get(`${this.baseUrl}/api/admin/get-all-driver?fence=${fence}`);
    }

    addDriver(body) {
        return this.http.post(`${this.baseUrl}/api/admin/drivers`, body)
    }
    editDriver(body) {
        return this.http.put(`${this.baseUrl}/api/admin/drivers`, body)
    }

    getParticularDriver(id) {
        return this.http.get(`${this.baseUrl}/api/admin/driver-detail?id=${id}`)
    }

    generateDriverCsv(){
        return this.http.get(`${this.baseUrl}/api/admin/generateDriverCSV`)
    }

    deleteDriver(id) {
        return this.http.delete(`${this.baseUrl}/api/admin/drivers?id=${id}`)
    }

    /**Geofence api */
    getGeofencingList(page) {
        return this.http.get(`${this.baseUrl}/api/admin/geo-fence?page=${page}`)
    }

    getAllGeofencingList(){
        return this.http.get(`${this.baseUrl}/api/admin/all-geo-fence`)
    }

    getGeofencing(id) {
        return this.http.get(`${this.baseUrl}/api/admin/geo-fence-detail?id=${id}`)
    }

    creategeoFencing(body) {
        return this.http.post(`${this.baseUrl}/api/admin/add-geo-fence`, body)
    }

    updategeoFencing(data) {
        return this.http.put(`${this.baseUrl}/api/admin/geo-fence`, data)
    }

    deletegeofence(id) {
        return this.http.delete(`${this.baseUrl}/api/admin/geo-fence?id=${id}`)
    }

    //Time slot api
    getTimeSlot(page) {
        return this.http.get(`${this.baseUrl}/api/admin/time-slot?page=${page}`)
    }

    getAllTimeSlot(){
        return this.http.get(`${this.baseUrl}/api/admin/all-time-slot`)
    }

    addTimeSlot(body) {
        return this.http.post(`${this.baseUrl}/api/admin/add-time-slot`, body)
    }

    updateTimeSlot(body) {
        return this.http.put(`${this.baseUrl}/api/admin/edit-time-slot`, body)
    }

    deleteTimeSlot(id) {
        return this.http.delete(`${this.baseUrl}/api/admin/time-slot?id=${id}`)
    }

    //coupon api
    getCoupons(page) {
        return this.http.get(`${this.baseUrl}/api/admin/coupon?page=${page}`)
    }
    getParticularCoupon(id) {
        return this.http.get(`${this.baseUrl}/api/admin/coupon-detail?id=${id}`)
    }

    addCoupon(body) {
        return this.http.post(`${this.baseUrl}/api/admin/coupon`, body)
    }

    updateCoupon(body) {
        return this.http.put(`${this.baseUrl}/api/admin/coupon`, body)
    }

    deleteCoupon(id) {
        return this.http.delete(`${this.baseUrl}/api/admin/coupon?id=${id}`)
    }

    //settingApi
    getSettingData() {
        return this.http.get(`${this.baseUrl}/api/admin/setting`)
    }

    updateSettingData(data) {
        return this.http.post(`${this.baseUrl}/api/admin/setting`, data)
    }

    //Truck Allocation
    getTrucks(page){
        return this.http.get(`${this.baseUrl}/api/admin/truckAllocation?page=${page}`)
    }

    addTruck(data){
        return this.http.post(`${this.baseUrl}/api/admin/addTruckAllocation`, data)
    }

    updateTruck(data){
        return this.http.put(`${this.baseUrl}/api/admin/updateTruckAllocation`, data)
    }

    deleteTruck(id){
        return this.http.get(`${this.baseUrl}/api/admin/deleteAllocation?id=${id}`)
    }

 // Broadcast 
 broadcast(body){
    return this.http.post(`${this.baseUrl}/api/admin/push-broadcast`,body)
}
}
