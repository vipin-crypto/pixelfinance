import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  imageUrl = 'http://192.168.1.168:4003';
  baseUrl = 'http://192.168.1.168:4003';

  constructor() { }
  login = `${this.baseUrl}/api/b2b/admin/auth/signIn`;
  getAllUserUrl = `${this.baseUrl}/api/b2b/admin/user/getAllUsers`;
  getUsersUrl = `${this.baseUrl}/admin/user`;
  getProfileUrl = `${this.baseUrl}/admin/getAdminProfile`;
  changePasswordUrl = `${this.baseUrl}/admin/changePassword`;
  updateProfileUrl = `${this.baseUrl}/admin/updateProfile`;
  getAllCategoriesUrl = `${this.baseUrl}/api/b2b/admin/category`;
  categoryUrl = `${this.baseUrl}/api/b2b/admin/category`;
  getAllBrandUrl = `${this.baseUrl}/admin/getAllBrands`;
  getAllBanner = `${this.baseUrl}/api/b2b/admin/banner`;
  getAllCouponUrl = `${this.baseUrl}/admin/getAllCoupons`;
  getAllDriverUrl = `${this.baseUrl}/admin/getAllDrivers`;
  getAllOfferUrl = `${this.baseUrl}/admin/getAllOffers`;
  resetPasswordUrl = `${this.baseUrl}/admin/resetPassword`;
  getAllOrdersUrl = `${this.baseUrl}/api/b2b/admin/order/getAllOrders`;
  getAllSubCategories = `${this.baseUrl}/api/b2b/admin/subCategory`;
  getAllSubAdminUrl = `${this.baseUrl}/admin/getAllSubAdmin`;
  getProductUrl = `${this.baseUrl}/api/b2b/admin/product`;
  getBannerDetailUrl = `${this.baseUrl}/admin/getBannerDetail`;
  brandUrl = `${this.baseUrl}/admin/brand`;
  assignToDriverUrl = `${this.baseUrl}/admin/assignToDriver`;
  subCategoryUrl = `${this.baseUrl}/api/b2b/admin/subCategory`;
  bannerUrl = `${this.baseUrl}/api/b2b/admin/banner`;
  couponUrl = `${this.baseUrl}/admin/coupon`;
  productUrl = `${this.baseUrl}/api/b2b/admin/product`;
  packUrl=`${this.baseUrl}/api/b2b/admin/product/pack`;
  forgotPasswordUrl = `${this.baseUrl}/admin/forgot-password`;
  sellerUrl = `${this.baseUrl}/admin/seller`;
  settingUrl = `${this.baseUrl}/admin/setting`;
  driverUrl = `${this.baseUrl}/admin/driver`;
  offerUrl = `${this.baseUrl}/admin/offer`;
  subAdminUrl = `${this.baseUrl}/admin/subAdmin`;
  uploadImageUrl = `${this.baseUrl}/api/b2b/admin/product/upload`;
  processOrderUrl = id => `${this.baseUrl}/api/b2b/admin/order/process_order/${id}`;
  getProductBySubCat = id => `${this.productUrl}?id=${id}`;
  getUserDetailUrl = id => `${this.baseUrl}/admin/getUserDetails/${id}`;
  editBannerStatusUrl = id => `${this.baseUrl}/admin/updateBannerStatus/${id}`;
  getProductDetailsUrl = id => `${this.baseUrl}/api/b2b/admin/product/get_product_details/${id}`;
  getCouponDetailsUrl = id => `${this.baseUrl}/admin/getCouponDetails/${id}`;
  getDriverDetailsUrl = id => `${this.baseUrl}/admin/getDriverDetails/${id}`;
  getAdminDetailsUrl = id => `${this.baseUrl}/admin/getAdminDetails/${id}`;
  getAllSubCat = id => `${this.subCategoryUrl}?category=${id}`;
  deleteCategoryUrl = id => `${this.categoryUrl}?id=${id}`;
  deleteBrandUrl = id => `${this.brandUrl}?id=${id}`;
  deleteBannerUrl = id => `${this.bannerUrl}?id=${id}`;
  deleteCouponUrl = id => `${this.couponUrl}?id=${id}`;
  deleteSubCategoryUrl = id => `${this.subCategoryUrl}?id=${id}`;
  deleteProductUrl = id => `${this.productUrl}?id=${id}`;
  deletePackUrl = id => `${this.packUrl}?id=${id}`;
  deleteSellerUrl = id => `${this.sellerUrl}?id=${id}`;
  deleteSubAdminUrl = id => `${this.subAdminUrl}?id=${id}`;
  deleteDriverUrl = id => `${this.driverUrl}?id=${id}`;
  getSubCatDetail = id => `${this.baseUrl}/admin/getSubCatDetail/${id}`;
  getBannerByTypeUrl = type => `${this.bannerUrl}?type=${type}`;
  deleteOfferUrl = id => `${this.offerUrl}?id=${id}`;
}
