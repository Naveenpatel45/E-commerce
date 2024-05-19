import { Component } from '@angular/core';
import { productAdd } from '../seller-signup';
import { ProductService } from '../services/product.service';
import { faTrashCan, faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
productList !: productAdd[];
productMessage: string | undefined=""
fIcon=faTrashCan
faEdit=faEdit
constructor(private _productService:ProductService){

}
ngOnInit(){
 this.getList()
}

delete(data:string | undefined){
  this._productService.deleteProduct(data).subscribe((res)=>{
    console.log(res,"deleted");
   if(res){
    this.productMessage="Product deleted successfully"
   setTimeout(()=>{
    this.productMessage=undefined
   },3000)
  }
    this.getList()
  })
}

getList(){
  this._productService.getProduct().subscribe((res:productAdd[])=>{
    this.productList=res;
    console.log(this.productList, "iam id")
  })
}
}
