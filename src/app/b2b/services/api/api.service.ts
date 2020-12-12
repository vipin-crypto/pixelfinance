import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { UrlService } from '../url/url.service';
import { LoginBody } from '../../requests/login-body';
import { FilterBody } from '../../requests/filter-body';
import { map } from 'rxjs/operators';
import { ProductBody } from '../../requests/product-body';
import { CouponBody } from '../../requests/coupon-body';
import { AddUserBody } from '../../requests/add-user-body';
import { AddSubAdminBody } from '../../requests/add-sub-admin-body';
import { DriverBody } from '../../requests/driver-body';
import { PackBody } from 'src/app/b2b/requests/pack-body';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

   imageUrl = 'http://192.168.1.168:5005';
   baseUrl = 'http://192.168.1.168:5005';
  constructor(
    private http: HttpClient,
    private url: UrlService
  ) { }

  singIn(body: LoginBody) {
    // console.log("body", body)
    return this.http.post(this.url.login, body);
  }

  getUsers(body: FilterBody,tokenvalue) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
    return this.http.post(this.url.getAllUserUrl, body,{headers: reqHeader});
  }

  getAllCategories(body: FilterBody,tokenvalue) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
    return this.http.get(`${this.baseUrl}/api/b2b/admin/category?limit=${body.limit}&page=${body.page}`,{headers: reqHeader});
  //  return this.http.get(this.url.getAllCategoriesUrl,{limit:body.limit,page:body.page},{headers: reqHeader});
  }
  addCategory(body: FormData,tokenvalue) {
    var reqHeader = new HttpHeaders({  'Authorization': tokenvalue });
   
    return this.http.post(this.url.categoryUrl, body,{headers:reqHeader});
  }
  deleteCategory(id: string,tokenvalue) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
    return this.http.delete(this.url.deleteCategoryUrl(id),{headers:reqHeader});
  }
  updateCategory(body: FormData,tokenvalue) {
    var reqHeader = new HttpHeaders({  'Authorization': tokenvalue });
    return this.http.put(this.url.categoryUrl, body,{headers:reqHeader});
  }
  getAllBrands(body: FilterBody) {
    return this.http.post(this.url.getAllBrandUrl, body);
  }
  getAllBanner(body: FilterBody) {
    return this.http.post(this.url.getAllBanner, body);
  }
  addBrand(body: FormData) {
    return this.http.post(this.url.brandUrl, body);
  }
  editBrand(body: FormData) {
    return this.http.put(this.url.brandUrl, body);
  }
  deleteBrand(id: string) {
    return this.http.delete(this.url.deleteBrandUrl(id));
  }
  addBanner(body: FormData) {
    return this.http.post(this.url.bannerUrl, body);
  }
  editBanner(body: FormData) {
    return this.http.put(this.url.bannerUrl, body);
  }
  deleteBanner(id: string) {
    return this.http.delete(this.url.deleteBannerUrl(id));
  }
  getCoupons() {
    return this.http.get(this.url.couponUrl);
  }
  getSubCat(body: FilterBody,tokenvalue) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
    return this.http.get(`${this.baseUrl}/api/b2b/admin/subCategory?limit=${body.limit}&page=${body.page}&category=${body.category}`,{headers: reqHeader});
    //return this.http.post(this.url.getAllSubCategories, body,{headers:reqHeader});
  }
  addSubCat(body: FormData,tokenvalue) {
    var reqHeader = new HttpHeaders({  'Authorization': tokenvalue });
    return this.http.post(this.url.subCategoryUrl, body,{headers:reqHeader});
  }
  editSubCat(body: FormData,tokenvalue) {
    var reqHeader = new HttpHeaders({  'Authorization': tokenvalue });
    return this.http.put(this.url.subCategoryUrl, body,{headers:reqHeader});
  }
  deleteSubCat(id: string,tokenvalue) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
    return this.http.delete(this.url.deleteSubCategoryUrl(id),{headers:reqHeader});
  }
  getCategories(tokenvalue) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
    return this.http.get(this.url.categoryUrl,{headers:reqHeader});
  }
  getBrands() {
    return this.http.get(this.url.brandUrl);
  }
  getSubCatWithoutPagination(id: string,tokenvalue) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
    
    return this.http.get(this.url.getAllSubCat(id),{headers:reqHeader});
  }
  addProduct(body,tokenvalue) {
    var reqHeader = new HttpHeaders({  'Authorization': tokenvalue });
    return this.http.post(this.url.productUrl, body,{headers:reqHeader});
  }
  editProduct(body: any,tokenvalue) {
    var reqHeader = new HttpHeaders({  'Authorization': tokenvalue });
    return this.http.put(this.url.productUrl, body,{headers:reqHeader});
  }
  deleteProduct(id: string,tokenvalue) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
    return this.http.delete(this.url.deleteProductUrl(id),{headers:reqHeader});
  }

  deletePack(id: string,tokenvalue) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
    return this.http.delete(this.url.deletePackUrl(id),{headers:reqHeader});
  }
  getProductWithPagination(body: FilterBody,tokenvalue) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
    return this.http.get(`${this.baseUrl}/api/b2b/admin/product?limit=${body.limit}&page=${body.page}`,{headers: reqHeader});
    //return this.http.post(this.url.getProductUrl, body,{headers:reqHeader});
  }
  getProductDetail(id: string,tokenvalue) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
    return this.http.get(this.url.getProductDetailsUrl(id),{headers:reqHeader});
  }
  addCoupon(body: CouponBody) {
    return this.http.post(this.url.couponUrl, body);
  }
  editCoupon(body: any) {
    return this.http.put(this.url.couponUrl, body);
  }
  deleteCoupon(id: string) {
    return this.http.delete(this.url.deleteCouponUrl(id));
  }
  getAllCoupons(body: FilterBody) {
    return this.http.post(this.url.getAllCouponUrl, body);
  }
  getCouponDetail(id: string) {
    return this.http.get(this.url.getCouponDetailsUrl(id));
  }
  editBannerStatus(id: string) {
    return this.http.get(this.url.editBannerStatusUrl(id));
  }
  addSeller(body: AddUserBody) {
    return this.http.post(this.url.sellerUrl, body);
  }
  editSeller(body: any) {
    return this.http.put(this.url.sellerUrl, body);
  }
  deleteSeller(id: string,tokenvalue) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
    return this.http.delete(this.url.deleteSellerUrl(id),{headers:reqHeader});
  }
  getUserDetail(id: string) {
    return this.http.get(this.url.getUserDetailUrl(id));
  }
  addSetting(body: any) {
    return this.http.post(this.url.settingUrl, body);
  }
  editSetting(body: any) {
    return this.http.put(this.url.settingUrl, body);
  }
  getSetting() {
    return this.http.get(this.url.settingUrl);
  }
  addSubAdmin(body: AddSubAdminBody) {
    return this.http.post(this.url.subAdminUrl, body);
  }
  editSubAdmin(body: any) {
    return this.http.put(this.url.subAdminUrl, body);
  }
  deleteSubAdmin(id: string) {
    return this.http.delete(this.url.deleteSubAdminUrl(id));
  }
  getAllSubAdmin(body: FilterBody) {
    return this.http.post(this.url.getAllSubAdminUrl, body);
  }
  getAdminDetails(id: string) {
    return this.http.get(this.url.getAdminDetailsUrl(id));
  }
  getAllDriverWithoutPagination() {
    return this.http.get(this.url.driverUrl);
  }
  getDrivers(body: FilterBody) {
    return this.http.post(this.url.getAllDriverUrl, body);
  }
  addDriver(body: DriverBody) {
    return this.http.post(this.url.driverUrl, body);
  }
  editDriver(body: any) {
    return this.http.put(this.url.driverUrl, body);
  }
  deleteDriver(id: string) {
    return this.http.delete(this.url.deleteDriverUrl(id));
  }
  getDriverDetails(id: string) {
    return this.http.get(this.url.getDriverDetailsUrl(id));
  }
  updateProfile(body: any) {
    return this.http.post(this.url.updateProfileUrl, body);
  }
  changePassword(body: any) {
    return this.http.post(this.url.changePasswordUrl, body);
  }
  getProfile() {
    return this.http.get(this.url.getProfileUrl);
  }
  getSubCatProduct(id: string,tokenvalue) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
    return this.http.get(this.url.getProductBySubCat(id),{headers:reqHeader});
  }
  getSubCatDetails(id: string) {
    return this.http.get(this.url.getSubCatDetail(id));
  }
  getBannerByType(type: string) {
    return this.http.get(this.url.getBannerByTypeUrl(type));
  }
  addOffer(body: any) {
    return this.http.post(this.url.offerUrl, body);
  }
  
  //pack
  addPack(body: PackBody,tokenvalue) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
    return this.http.post(`${this.baseUrl}/api/b2b/admin/product/pack`, body,{headers:reqHeader});
}
  editOffer(body: any) {
    return this.http.put(this.url.offerUrl, body);
  }
  deleteOffer(id: string) {
    return this.http.delete(this.url.deleteOfferUrl(id));
  }
  getAllOffers(body: FilterBody) {
    return this.http.post(this.url.getAllOfferUrl, body);
  }
  getBannerDetails(body: any) {
    return this.http.post(this.url.getBannerDetailUrl, body);
  }
  getAllOrders(body: any,tokenvalue) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
    return this.http.post(this.url.getAllOrdersUrl, body,{headers:reqHeader});
  }
  assignDriver(body: any) {
    return this.http.post(this.url.assignToDriverUrl, body);
  }
  forgotPassword(body: any) {
    return this.http.post(this.url.forgotPasswordUrl, body);
  }
  resetPassword(body: any) {
    return this.http.post(this.url.resetPasswordUrl, body);
  }
  
  processOrder(id: string, body: any,tokenvalue) {
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
    return this.http.put(this.url.processOrderUrl(id), body,{headers:reqHeader});
  }
//from b2c

//category api
getallCategories(limit,page,tokenvalue) {
  var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
  return this.http.get(`${this.baseUrl}/api/b2b/admin/category?limit=${limit}&page=${page}`,{headers: reqHeader});
}


//sub-category api
getallSubcategories(categoryid, page,limit,tokenvalue) {
  var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
    return this.http.get(`${this.baseUrl}/api/b2b/admin/subCategory?limit=${limit}&page=${page}&category=${categoryid}`,{headers: reqHeader});
  //return this.http.get(`${this.baseUrl}/api/admin/sub-category?category=${categoryid}&page=${page}`)
}
getallPacks(id,tokenvalue) {
  var limit =10;
  var page=0;
  var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
  return this.http.get(`${this.baseUrl}/api/b2b/admin/product/pack?limit=${limit}&page=${page}&productId=${id}`,{headers:reqHeader});
}
updateProduct(body,tokenvalue) {
  var reqHeader = new HttpHeaders({  'Authorization': tokenvalue });
  return this.http.put(`${this.baseUrl}/api/b2b/admin/product`, body,{headers:reqHeader});
}
getPackDetails(id,tokenvalue) {
  var limit =10;
  var page=0;
  var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
  return this.http.get(`${this.baseUrl}/api/b2b/admin/product/get_pack_details/${id}`,{headers:reqHeader})
}

updatePackDetails(body,tokenvalue){
  var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8', 'Authorization': tokenvalue });
  return this.http.put(`${this.baseUrl}/api/b2b/admin/product/pack`,body,{headers:reqHeader})
}

// getParticularProduct(id) {
//   return this.http.get(`${this.baseUrl}/api/admin/product-detail?id=${id}`)
// }

  uploadImage(body: FormData,tokenvalue) {
    var reqHeader = new HttpHeaders({  'Authorization': tokenvalue });
    return this.http.post(this.url.uploadImageUrl, body, {
      headers:reqHeader,
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event: any) => {
      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { success: true, message: 'progress', data: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    }));
  }
}
