import { BlockLike } from 'typescript';

export class ProductBody {
  name: string;
  category: string = '';
  images: any;
  subCategory: string = '';
  brand: string = '';
  country: String;
  description: string;
  desclaimer: String;
  id: string;
  note: String;
  deliveryTime: string = '';
  isRecommended: boolean = false;
  isFeatured: boolean = false;
  isBestSelling: boolean = false;
  discount: string;
  type: string = "";
  // topDeals: boolean = false;

  // topDeals: boolean = false;
  // price: number;
  // productQuantity: number;
  // purchaseQuantity: number;
  // condition: string;
  // discount: number;
  // extraPrice: number;
  // combo: any;
  // comboDiscount: number;
}
