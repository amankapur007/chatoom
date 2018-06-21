import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { Observable } from "rxjs/Observable";

import * as firebase from 'firebase/app';
import { error } from "util";
import { resolve } from "url";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { DatabaseService } from "./database.service";


@Injectable()
export class AuthService {

  private user: Observable<firebase.User>
  private authState: any;
  private provider:any;

  constructor(private _router: Router, private _auth: AngularFireAuth,
    private _db: AngularFireDatabase){
    this.user = this._auth.authState;
    this.user.subscribe((user)=>{
      this.authState = user;
    })
    firebase.auth().useDeviceLanguage();
    this.provider = new firebase.auth.GoogleAuthProvider();

  }

  getRecaptchaVerifier() {
    return new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }
  authUser() {
    return this.user;
  }

  signUp(email, password, displayName) {
    return this._auth.auth.createUserWithEmailAndPassword(email, password).then(user => {
        return user.sendEmailVerification().then((resp) => {
          return user;
        }).catch((error) => {
          console.log(error);
          throw new ErrorObservable(error)
        })
    }).catch(error => {
      console.log(error)
      throw new ErrorObservable(error)
    });
  }

  login(email, password) {
    return this._auth.auth.signInWithEmailAndPassword(email, password).then((user: firebase.User) => {
      return user;
    }).catch(error => {
      console.log(error)
      throw new ErrorObservable(error);
    })
  }

  signOut(user) {
    const status = "offline"
    return this.setUserStatus(status).then(()=>{
      return this._auth.auth.signOut();
    });
  }

  setUserData(email: string, displayName: string, status: string) {
    const path = `users/${this.currentUserId}`;
    const data = {
      displayName: displayName,
      email: email,
      status: status
    }
    this._db.object(path).update(data).catch(error => console.log(error));
  }

  get currentUserId(): string {
    return this.authState != null ? this.authState.uid : '';
  }

  getUser():any{
    return this.authState != null ? this.authState : null;
  }
  setUserStatus(status: string) {
    var user = this.getUser();
    console.log(user.uid)
    const path = `users/${user.uid}`;
    const data = {
      status: status,
    }
    return this._db.object(path).update(data);
  }

  loginWithPhone(number, appVerifier) {
    return firebase.auth().signInWithPhoneNumber(number, appVerifier)
  }

  loginWithGoogle(){
    return this._auth.auth.signInWithPopup(this.provider).then(user=>{
      return user;
    }).catch(error => {
      console.log(error)
      throw new ErrorObservable(error);
    })
  }
  destroy(){
    this._auth.auth.signOut();
  }

  authProviders(){
    return firebase.auth;
  }
}