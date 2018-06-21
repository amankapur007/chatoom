import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:Observable<firebase.User>;
  userEmail: string;
  uid:string;
  constructor(private _authService:AuthService, private _router:Router) { }

  ngOnInit() {
    this.user = this._authService.authUser();
    var providers=this._authService.authProviders();
    this.user.subscribe(user=>{
      if(user){
        console.log(providers.EmailAuthProvider.PROVIDER_ID);
        
        if(user.providerData[0].providerId ==providers.PhoneAuthProvider.PROVIDER_ID){
          this.userEmail = user.phoneNumber;
        }else if(user.providerData[0].providerId ==providers.GoogleAuthProvider.PROVIDER_ID){
          this.userEmail = user.displayName;
        }else if(user.providerData[0].providerId ==providers.EmailAuthProvider.PROVIDER_ID){
          this.userEmail = user.email;
        }else if(user.providerData[0].providerId ==providers.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD){
          this.userEmail = user.email;
        }else{
          this.userEmail = user.email;          
        }
      }
    })
  }

  logout(){
    this.user = this._authService.authUser();
      if(this.user){
        this._authService.signOut(this.user).then(()=>{
          this._router.navigate(['login']);
        });
      }
    }
}
