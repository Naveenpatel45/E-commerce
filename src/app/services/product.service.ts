import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productAdd } from '../seller-signup';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

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
}
