import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';

interface RouteParams {
  id: string; // or number if the id is numeric
}
@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})

export class SellerUpdateProductComponent {
  productForm !: FormGroup;
  urlId !: string;
  isUpdated !: boolean;

  constructor(private _activatedRoute:ActivatedRoute , private _productService:ProductService , private _router:Router){

  }
  ngOnInit(){
    this.productForm=new FormGroup({
      name:new FormControl(),
      price:new FormControl(),
      category:new FormControl(),
      color:new FormControl(),
      description:new FormControl(),
      url:new FormControl()
    })

    const routeParamsSubscription: Subscription=this._activatedRoute.params.subscribe((val:Params)=>{
      const res = val as RouteParams;
      console.log(res.id);
      this.urlId=res.id
      this._productService.getSingleProduct(res.id).subscribe((res)=>{
        console.log(res);
        this.productForm.patchValue(res)
      })
    })
  }

  updateProduct(){
    this._productService.updateProduct(this.productForm.value, this.urlId).subscribe((res)=>{
      console.log(res);
      this.isUpdated=true;
      setTimeout(()=>{
        this.isUpdated=false;
        this._router.navigate(["seller-home"])
      },3000)
    })
  }
}
