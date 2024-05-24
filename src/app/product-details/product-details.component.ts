import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { productAdd } from '../seller-signup';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  productData !: productAdd;
  nProds:number=1;
  constructor(private _activateroute: ActivatedRoute, private productService: ProductService) {

  }
  ngOnInit() {
    this._activateroute.params.subscribe((res) => {
      this.productService.getSingleProduct(res["productId"]).subscribe((res: productAdd) => {
        console.log(res)
        if(res){
          this.productData = res;
        }
      })
    })
  }

  cal(val:string){
    if(val==='sub'){
      this.nProds=this.nProds-1
    }
    else{
      this.nProds=this.nProds+1
    }
  }
}
