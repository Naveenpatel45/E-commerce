import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cartItem, productAdd } from '../seller-signup';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) {
   
   }

  postProduct(data:productAdd){
    return this.http.post('http://localhost:3000/products', data)
  }

  getProduct(){
    return this.http.get<productAdd[]>('http://localhost:3000/products')
  }

  deleteProduct(data:string | undefined){
    return this.http.delete(`http://localhost:3000/products/${data}`)
  }

  getSingleProduct(id:string){
    return this.http.get<productAdd>(`http://localhost:3000/products/${id}`)
  }
  updateProduct(data:productAdd, id:string){
     return this.http.put("http://localhost:3000/products/"+ id,data)
  }
  popularProducts(){
    return this.http.get<productAdd[]>("http://localhost:3000/products?_limit=3")
  }
  getSearchedProducts(data:string){
    return this.http.get<productAdd[]>('http://localhost:3000/products?color='+data)
  }

  postCartItems(data:cartItem){
    return this.http.post('http://localhost:3000/cartItems',data)
  }

  getCartItemsOfUser(data:string){
    return this.http.get<cartItem[]>('http://localhost:3000/cartItems?userId='+data)
  }


  deleteCartProduct(data:string | undefined){
    return this.http.delete(`http://localhost:3000/cartItems/${data}`)
  }
  
   

  cartNumber= new BehaviorSubject<number>(0) ;
  
  totalPrice= new BehaviorSubject<number>(0);
}
