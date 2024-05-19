import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
constructor(private router: Router){}
menuType:string='default';
sellerName:string="Seller Name"
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
    else if(val.url){
      console.log(val.url)
      this.menuType='default'
    }
  })
}
logout(){
  localStorage.removeItem("seller")
  this.router.navigate(["/"]);
  this.sellerName='Seller Name';
}
}
