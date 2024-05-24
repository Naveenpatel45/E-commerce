import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserSignup } from '../seller-signup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
signUpForm !: FormGroup;
constructor(private userService:UserService, private router:Router){

}
ngOnInit(){
  this.signUpForm=new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl()

  })
}
signUp(){
  console.log(this.signUpForm.value);
  this.userService.userSignUp(this.signUpForm.value).subscribe((res:UserSignup)=>{
    console.log(res);
    if(res){
      localStorage.setItem('user',JSON.stringify(res));
      this.signUpForm.reset();
      this.router.navigate(['/'])
    }
  })
}
}
