export class ProductBody {
  name: string;
  images: any;
  price: number;
  productQuantity: number;
  purchaseQuantity: number;
  condition: string;
  category: string = '';
  subCategory: string = '';
  brand: string = '';
  extraPrice: number;
  combo: any;
  comboDiscount: number;
  discount: number;
  description: string;
  id: string;
  topDeals: boolean = false;
  isRecommended: boolean = false;
  isFeatured: boolean = false;
  isBestSelling: boolean = false;
  _id:string;
  //isBestSelling
}
