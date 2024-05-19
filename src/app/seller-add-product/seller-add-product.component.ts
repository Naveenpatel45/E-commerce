import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

  productForm !: FormGroup;
  isSuccess !: boolean;
  _productService:ProductService =inject(ProductService)
  ngOnInit(){
    this.productForm=new FormGroup({
      name:new FormControl(),
      price:new FormControl(),
      category:new FormControl(),
      color:new FormControl(),
      description:new FormControl(),
      url:new FormControl()
    })
  }
  addProduct(){
    console.log(this.productForm);
    this._productService.postProduct(this.productForm.value).subscribe((res)=>{
      console.log(res);
      if(res){
         this.isSuccess=true;
         setTimeout(()=>{
          this.isSuccess=false
         },3000)
         this.productForm.reset()
      }
    })
  }
}
