import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserSignup } from '../seller-signup';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  userSignUp(data:UserSignup){
    return this.http.post<UserSignup>('http://localhost:3000/users',data)
  }
}
