import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private _authService:AuthService, private _router:Router) { }

  email:string;
  password:string;
  errMsg:string;
  ngOnInit() {
  }

  logIn(){
    const email = this.email;
    const password = this.password;
    this._authService.login(email,password).then(resolve=>{
      this._router.navigate(['chat']);
    }).catch(error=>{
      this.errMsg = error.message;
    });
  }
}
