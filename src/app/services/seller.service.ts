import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SellerSignup } from '../seller-signup';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http:HttpClient, private _router:Router) { }

  isSeller= new BehaviorSubject<boolean>(false);
  isErrorMsg= new BehaviorSubject<boolean>(false)
  sellerSignUp(data:SellerSignup){
     this.http.post('http://localhost:3000/seller',data).subscribe((res)=>{
      console.log("iam here ", res)
      this._router.navigateByUrl('seller-home');
      this.isSeller.next(true);
      localStorage.setItem('seller', JSON.stringify(res))
    })
  }
  sellerLogin(data:any){
    console.log(data.email, data.password)
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, {observe:'response'}).subscribe((res:any)=>{
      console.log(res, typeof res, "res result");
      if(res && res.body.length){
        this._router.navigate(["seller-home"])
        this.isSeller.next(true);
      localStorage.setItem('seller', JSON.stringify(res.body))
      }
      else{
        console.log("error");
        this.isErrorMsg.next(true)
      }
    })
  }
}
