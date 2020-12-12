export class CouponBody {
  name: string;
  discount: string;
  type: string = '';
  couponType: string = '';
  maxAmount: string;
  minAmount:string;
  // category: string = '';
  startDate: string;
  endDate: string;
  description: string;
  country: string = "india"
  id: string;
}
