import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { productAdd } from '../seller-signup';

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
}
}
