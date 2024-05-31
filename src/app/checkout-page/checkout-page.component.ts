import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent {
 userAddressForm !: FormGroup;
 totalPrice !: number

 constructor(private product:ProductService){

 }
 ngOnInit(){
  this.userAddressForm=new FormGroup({
    email:new FormControl(),
    address:new FormControl(),
    contact: new FormControl()
  })
  if(localStorage.getItem('user')){
    let data=localStorage.getItem('user');
    let parseData=data && JSON.parse(data)[0].id;
    this.product.getCartItemsOfUser(parseData).subscribe((res)=>{
      this.product.cartNumber.next(res.length)
    })
  }
  this.product.totalPrice.subscribe((res)=>{
    console.log(res);
    this.totalPrice=res
  })
 }

 addressForm(){
  console.log(this.userAddressForm.value)
 }
}
