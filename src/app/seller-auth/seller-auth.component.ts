import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { SellerSignup } from '../seller-signup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
 isLoginOrSignup:boolean=false
sellerForm !:FormGroup;
sellerLoginForm !: FormGroup;
_sellerService:SellerService= inject(SellerService);
_router:Router= inject(Router);
isErrorMsg:boolean=false;
errorData:string='';
ngOnInit(){
  if(localStorage.getItem('seller')){
    this._router.navigate(['seller-home'])
  }
  this.sellerForm=new FormGroup({
    name: new FormControl(),
    password: new FormControl(),
    email: new FormControl()
  })

  this.sellerLoginForm= new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })

  this._sellerService.isErrorMsg.subscribe((data:boolean)=>{
    this.isErrorMsg=data;
    if(this.isErrorMsg){
      this.errorData="Credentials are wrong"
   }
   else{
     this.errorData='';
   }
  })
}

signUp(){
  // console.log(this.sellerForm.value);
  this._sellerService.sellerSignUp(this.sellerForm.value)
}
Login(){
  console.log(this.sellerLoginForm.value)
  this._sellerService.sellerLogin(this.sellerLoginForm.value)
}
signupToLogin(){
this.isLoginOrSignup=true
}
loginToSignup(){
this.isLoginOrSignup=false
}
}
