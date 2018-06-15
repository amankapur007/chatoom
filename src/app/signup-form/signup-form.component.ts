import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { resolve } from 'dns';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  email: string;
  password:string;
  displayName: string;
  errMsg: string;
  constructor(private _roter:Router, private _authService: AuthService) { }

  ngOnInit() {
  }

  signUp(){
    const email = this.email;
    const displayName = this.displayName; 
    const password = this.password;
    this._authService.signUp(email,password,displayName).then(resolve=>{
      this._roter.navigate(['chat']);
    }).catch(error=>{
      this.errMsg = error.message;
    });
  }
}
