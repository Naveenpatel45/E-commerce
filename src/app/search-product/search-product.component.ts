import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Params } from '@fortawesome/fontawesome-svg-core';
import { ProductService } from '../services/product.service';
import { productAdd } from '../seller-signup';

interface RouteParams {
  query: string; // or number if the id is numeric
}

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent {
  searchedProducts!:productAdd[];
constructor(private _activateRouter:ActivatedRoute, private _pService:ProductService){

}
ngOnInit(){
  this._activateRouter.params.subscribe((val:Params)=>{
    const res = val as RouteParams;
    console.log(res.query);
    this._pService.getSearchedProducts(res.query).subscribe((res:productAdd[])=>{
       this.searchedProducts=res;
       console.log(this.searchedProducts)
    })
  })
}
}
