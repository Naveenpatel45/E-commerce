import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cartItem, productAdd } from '../seller-signup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
popularData!:productAdd[];
allProduct !: productAdd[];
constructor( private _product:ProductService){
  
}
ngOnInit(){
  this._product.popularProducts().subscribe((data:productAdd[])=>{
    this.popularData=data;
  })

  this._product.getProduct().subscribe((res:productAdd[])=>{
    this.allProduct=res;
  })

  if(localStorage.getItem('user')){
    let data= localStorage.getItem('user');
    let parseData= data && JSON.parse(data)[0].id;
    console.log(parseData);
    this._product.getCartItemsOfUser(parseData).subscribe((res:cartItem[])=>{
      this._product.cartNumber.next(res.length)
    })
  }
}
}
