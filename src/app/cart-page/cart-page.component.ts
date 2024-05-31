import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cartItem, cartPrice } from '../seller-signup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
cartProducts!:cartItem[];
prodRates : cartPrice={
  "price" : 0,
  "tax" : 0,
  "delivery" : 0,
  "discount": 0,
  "total" : 0,
};
  constructor(private product:ProductService, private router:Router){

  }
  ngOnInit(){
    if(localStorage.getItem('user')){
      let data=localStorage.getItem('user');
      let parseData=data && JSON.parse(data)[0].id;
      console.log(parseData);
      this.product.getCartItemsOfUser(parseData).subscribe((res:cartItem[])=>{
          this.cartProducts=res;
          this.product.cartNumber.next(res.length);
          console.log(res);
          res.forEach((elem:cartItem)=>{
            if(elem.quantity){
              this.prodRates.price  +=  (+elem.price * +elem.quantity);
            }
          })
          this.prodRates.tax=this.prodRates.price/10;
          this.prodRates.discount=this.prodRates.price/10;
          this.prodRates.delivery=100;
          this.prodRates.total=this.prodRates.price-this.prodRates.tax-this.prodRates.discount-this.prodRates.delivery;
          console.log(this.prodRates.price)
      })
    }
  }

  navigate(){
    this.router.navigateByUrl('/checkout-page/'+this.prodRates.total);
    // this.product.totalPrice.next(this.prodRates.total)
  }
  
}
