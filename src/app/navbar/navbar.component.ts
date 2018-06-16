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
    this.user.subscribe(user=>{
      if(user){
        this.userEmail = user.email;
      }
    })
  }

  logout(){
    this.user = this._authService.authUser();
    this.user.subscribe(user=>{
      if(user){
        this._authService.signOut(user).then(()=>{
          this._router.navigate(['login']);
        });
      }
    })
    }
}
