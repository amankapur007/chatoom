import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  email: string;
  password:string;
  displayName: string;
  errMsg: string=undefined;
  constructor(private _roter:Router, private _authService: AuthService,
              private _db:DatabaseService, private _database:DatabaseService) { }

  ngOnInit() {
  }

  signUp(){
    const email = this.email;
    const displayName = this.displayName; 
    const password = this.password;
    this._authService.signUp(email,password,displayName).then((user:any)=>{
      this._database.storeUserData(user.uid, email, displayName, 'unverified');
      this._authService.destroy();
      this._roter.navigate(['notification'],{queryParams:{customMessage:'EM'}});
    }).catch(error=>{
      console.log(error);
      this.errMsg = error.error.message; 
    });
  }

}
