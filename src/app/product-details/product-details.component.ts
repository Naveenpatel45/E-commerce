import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { productAdd, cartItem } from '../seller-signup';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productData !: productAdd;
  nProds:number=1;
  productId!:string;
  showRemoveCart:boolean=false;
  userIdP !: string;
  removeItemId !: string | undefined;
  cartItems !: number
  constructor(private _activateroute: ActivatedRoute, private productService: ProductService) {

  }
  ngOnInit() {
    this._activateroute.params.subscribe((res) => {
        this.productId=res['productId']
      this.productService.getSingleProduct(res["productId"]).subscribe((res: productAdd) => {
        if(res){
          this.productData = res;
        }
      })
    })
    if(localStorage.getItem("localCart")){
      let localData= localStorage.getItem("localCart")
      let parseLocalData=localData && JSON.parse(localData)
      // console.log(parseLocalData, this.productId)
      let filterData=parseLocalData.filter((res:productAdd)=>{
        return res.id==this.productId
      })
      if(filterData.length>0){
        this.showRemoveCart=true;
      }
      else{
        this.showRemoveCart=false;
      }
    }
    this.removeItemUpdate();
  }

  cal(val:string){
    if(val==='sub'){
      this.nProds=this.nProds-1
    }
    else{
      this.nProds=this.nProds+1
    }
  }
  addToCart(){
    if(!localStorage.getItem("user")){
      this.showRemoveCart=true
      this.productData.quantity=this.nProds.toString()
      if(localStorage.getItem("localCart")){
          let localData=localStorage.getItem('localCart');
          let parseLocalData=localData && JSON.parse(localData)
          console.log(parseLocalData,"in parse");
          parseLocalData.push(this.productData);
          this.productService.cartNumber.next(parseLocalData.length)
          localStorage.setItem("localCart",JSON.stringify(parseLocalData))
      }
      else{
        localStorage.setItem("localCart",JSON.stringify([this.productData]));
        this.productService.cartNumber.next(1)
      }
      
    }
    else{
      this.showRemoveCart=true
      let userId=localStorage.getItem('user');
      let parseUserId=userId && JSON.parse(userId)[0].id;
      let cartData={...this.productData,'userId':parseUserId,'quantity':this.nProds.toString(),'productId':this.productId}
      delete cartData.id
      console.log(cartData);
      this.productService.postCartItems(cartData).subscribe((res)=>{
        console.log(res, "submitted");
        this.removeItemUpdate()
      })
      this.productService.cartNumber.next(++this.cartItems)
    }
  }
  removeFromCart(){
    if(localStorage.getItem('localCart')){
      let localData=localStorage.getItem('localCart');
      let parseData=localData && JSON.parse(localData);
      let filterData=parseData.filter((res:productAdd)=>{
        return this.productId !== res.id
      });
      localStorage.setItem("localCart", JSON.stringify(filterData));
      this.showRemoveCart=false;
      this.productService.cartNumber.next(filterData.length)
    }
    else if(localStorage.getItem('user')){
      this.removeItemUpdate();
      this.productService.deleteCartProduct(this.removeItemId).subscribe((res)=>{
        console.log("deleted successfuly");
        this.showRemoveCart=false;
        this.productService.cartNumber.next(--this.cartItems)
      })
    }
    else{

    }
 
  }

  removeItemUpdate(){
    if(localStorage.getItem('user')){
      let data=localStorage.getItem('user');
      this.userIdP=data && JSON.parse(data)[0].id;
      console.log(this.userIdP);
      this.productService.getCartItemsOfUser(this.userIdP).subscribe((res:cartItem[])=>{
        console.log(res);
        this.cartItems=res.length
        this.productService.cartNumber.next(res.length)
        let filterCart=res.filter((elem:cartItem)=>{
            return elem.productId===this.productId;
        })
        if(filterCart && filterCart.length>0){
          this.showRemoveCart=true;
          console.log(filterCart, "iam here")
          this.removeItemId= filterCart[0].id
        }
      })
    }
  }
}
