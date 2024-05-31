import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSignup } from '../seller-signup';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor(private http:HttpClient, private _router:Router) { }

  userSignUp(data:UserSignup){
    return this.http.post<UserSignup>('http://localhost:3000/users',data)
  }

  userLogin(data:UserSignup){
    return this.http.get<UserSignup[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`)
  }

  userAlreadySignUp(){
    if(localStorage.getItem('user')){
      this._router.navigateByUrl("/")
    }
  }
}
