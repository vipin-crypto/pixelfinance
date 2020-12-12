import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount'
})
export class AmountPipe implements PipeTransform {

  transform(orderList: any[]): any {
    console.log(orderList);
    let amount=0;
     for(let item of orderList){
       if(item.productId[0].vendorId && item.productId[0].vendorId!=null){
          amount= amount + (item.totalAmount*item.quantity)
       }
     }
     console.log('amount',amount)
     return amount;
    // return null;
  }

}
