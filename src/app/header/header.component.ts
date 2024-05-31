import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { UserSignup, productAdd } from '../seller-signup';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
constructor(private router: Router, private _productService:ProductService){
  if(localStorage.getItem('localCart')){
    let localData=localStorage.getItem('localCart');
    let parseData=localData && JSON.parse(localData);
    _productService.cartNumber.next(parseData.length)
  }
}
menuType:string='default';
sellerName:string="Seller Name";
searchInput:string='';
userSignUpData !:UserSignup;
cartNumber: number=0;
ngOnInit(){
  this.router.events.subscribe((val:any)=>{
    if(val.url && val.url.includes('seller')){
      let data=localStorage.getItem('seller');
      if(data){
        let local=JSON.parse(data)[0];
        this.sellerName=local.name;
      }
      this.menuType='seller'
    }
    else if(localStorage.getItem('user')){
       let userData=localStorage.getItem('user');
       this.userSignUpData=userData && JSON.parse(userData);
       this.menuType='user'
    }
    else if(val.url){
      console.log(val.url)
      this.menuType='default'
    }
  })

  this._productService.cartNumber.subscribe((res:number)=>{
    this.cartNumber=res;
  })
}
logout(){
  localStorage.removeItem("seller")
  this.router.navigate(["/"]);
  this.sellerName='Seller Name';
}
searchItem(){
   this.router.navigate([`searchProduct/${this.searchInput}`])
}
userLogout(){
  localStorage.removeItem('user');
  this.router.navigate(['/userAuth']);
  this._productService.cartNumber.next(0)
}

}
