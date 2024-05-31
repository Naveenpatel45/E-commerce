import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserSignup, productAdd } from '../seller-signup';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
signUpForm !: FormGroup;
loginForm !: FormGroup;
formToShow : boolean=true;
constructor(private userService:UserService, private router:Router , private productService:ProductService){

}
ngOnInit(){
  this.signUpForm=new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  })
  this.loginForm=new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)])
  })
  this.userService.userAlreadySignUp()
}
signUp(){
  console.log(this.signUpForm.value);
  this.userService.userSignUp(this.signUpForm.value).subscribe((res:UserSignup)=>{
    console.log(res, "signUp")
    if(res){
      localStorage.setItem('user',JSON.stringify(res));
      this.signUpForm.reset();
      if(localStorage.getItem('localCart')){
        let cartData=localStorage.getItem('localCart');
        let parseData= cartData && JSON.parse(cartData);
        parseData.forEach((rest:productAdd)=>{
          let cartData={...rest,'productId':rest.id, 'userId':res.id}
          console.log(cartData, "here")
          delete cartData.id;
          console.log(cartData, "iamhere Cart");
          this.productService.postCartItems(cartData).subscribe((res)=>{
            console.log(res, "done");
          })
        })
        localStorage.removeItem('localCart')
      }
      this.router.navigate(['/'])

    }
  })
}
login(){
  console.log(this.loginForm.get('email'), this.loginForm.invalid)
   this.userService.userLogin(this.loginForm.value).subscribe((res:UserSignup[])=>{
    console.log(res, "iam here", res.length)
    if(res[0] && res.length>0){
      localStorage.setItem('user', JSON.stringify(res));
      this.loginForm.reset();
      let userId=res[0].id
      console.log(res[0].id);
      if(localStorage.getItem('localCart')){
        let cartData=localStorage.getItem('localCart');
        let parseData= cartData && JSON.parse(cartData);
        console.log(parseData);
        parseData.forEach((res:productAdd)=>{
          let cartData={...res,'productId':res.id, 'userId':userId}
          delete cartData.id;
          console.log(cartData, "iamhere Cart");
          this.productService.postCartItems(cartData).subscribe((res)=>{
            console.log(res, "done");
          })
        })
        localStorage.removeItem('localCart')
      }
      this.router.navigate(['/'])
    }
   })
}
signToLogin(data:string){
  if(data==='signUp'){
    this.formToShow=false
  }
  else{
    this.formToShow=true
  }
}
}
