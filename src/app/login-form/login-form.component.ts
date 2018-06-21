import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { WindowService } from "../services/window.service";
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  windowRef: any;
  countryCode: string;
  constructor(private _authService: AuthService,
    private _router: Router,
    private _window: WindowService,
    private _db: DatabaseService
  ) {
  }


  email: string;
  password: string;
  errMsg: string;
  phno: string;
  verificationCode: string
  ngOnInit() {
    this.countryCode = '+91'
    this.windowRef = this._window.windowRef;
    this.windowRef.recaptchaVerifier = this._authService.getRecaptchaVerifier();
    this.windowRef.recaptchaVerifier.render()
  }

  logIn() {
    const email = this.email;
    const password = this.password;
    this._authService.login(email, password).then((user: any) => {
      console.log(user);
      if (user.emailVerified) {
        this._db.updateUserStatus(user.uid, email, 'online').then((res) => {
          this._router.navigate(['chat']);
          console.log('logged');
        }).catch(error => {
          this.errMsg = error.error.message;
        });
      } else {
        console.log('not verified')
        this.errMsg = 'Email is not verified, Contact us you did not recieved the link'
      }
    }).catch(error => {
      this.errMsg = error.error.message;
    });
  }

  logInWithPhone() {
    console.log('ph', this.phno);
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = this.countryCode + '' + this.phno;
    this._authService.loginWithPhone(num, appVerifier).then(result => {
      console.log(result)
      this.windowRef.confirmationResult = result;
    })
      .catch(error => console.log(error));
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        console.log(result.user);
        this._db.storeUserData(result.user.uid,
          result.user.phoneNumber,
          result.user.phoneNumber,
          'verified').then((res) => {
            this._db.updateUserStatus(result.user.uid, result.user.phoneNumber, 'online')
            this._router.navigate(['chat']);
            console.log('logged');
          }).catch(error => {
            this.errMsg = error.error.message;
          });
      })
      .catch(error => console.log(error, "Incorrect code entered?"));
  }

  loginWithGoogle() {
    this._authService.loginWithGoogle().then((user) => {
      console.log(user.user.email)
      this._db.storeUserData(user.user.uid, user.user.email, user.user.displayName,user.user.emailVerified).then((res) => {
        this._db.updateUserStatus(user.user.uid,user.user.email,'online')
        this._router.navigate(['chat']);
        console.log('logged');
      }).catch(error => {
        this.errMsg = error.message;
      });
    }).catch(error => {
      this.errMsg = error.error.message;
    });
  }
}
