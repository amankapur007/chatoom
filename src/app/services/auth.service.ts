import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { Observable } from "rxjs/Observable";

import * as firebase from 'firebase/app';
import { error } from "util";
import { resolve } from "url";

@Injectable()
export class AuthService {

  private user: Observable<firebase.User>
  private authState: any;

  constructor(private _router: Router, private _auth: AngularFireAuth, private _db: AngularFireDatabase) {
    this.user = this._auth.authState;
  }

  authUser() {
    return this.user;
  }

  signUp(email, password, displayName) {
    return this._auth.auth.createUserWithEmailAndPassword(email, password).then(user => {
      this.authState = user;
      const status = 'online';
      this.setUserData(email, displayName, status);
    }).catch(error => console.log(error));
  }

  login(email, password) {
    return this._auth.auth.signInWithEmailAndPassword(email, password).then(user => {
      this.authState = user;
      const status = 'online';
      this.setUserStatus(status);
    }).catch(error => {
      console.log(error)
    })
  }

  signOut(user) {
    this.authState = user;
    return this._auth.auth.signOut().then(() => {
      const status = "offline"
      this.setUserStatus(status);
    }).catch(error => console.log(error));
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

  setUserStatus(status: string) {
    const path = `users/${this.currentUserId}`;
    const data = {
      status: status,
    }
    this._db.object(path).update(data).catch(error => console.log(error));
  }
}