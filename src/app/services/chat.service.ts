import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFireAuth } from "angularfire2/auth";
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import { ChatMessage } from '../models/chat-message.model';
@Injectable()
export class ChatService {

  user: firebase.User;
  chatMessages: FirebaseListObservable<ChatMessage[]>;
  chatMessage: ChatMessage;
  username: string;

  constructor(
    private _db: AngularFireDatabase,
    private _afAuth: AngularFireAuth,
    private _authService: AuthService) { 
      this._afAuth.authState.subscribe(auth=>{
        if(auth!=undefined && auth!=null){
          this.user = auth;
        }

        this.getUserName().subscribe(a=>{
          this.username = a.displayName
       });

      })
    }

  sendMessage(msg: string){
    console.log(this.username);
    const timeStamp = this.getTimeStamp();
    const email:string = this.user.email;
    //const email:string = 'test@gmail.com';
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message:msg,
      timeSent:timeStamp,
      userName: this.username,
      //userName: "test",
      email:email
    });
    console.log('Called Message')
  }

  getMessages():FirebaseListObservable<ChatMessage[]>{
    return this._db.list('messages',{
      query:{
        limitToLast:25,
        orderByKey:true
      }
    });
  }

  getTimeStamp(){
    const now = new Date();
    const date = now.getUTCFullYear()+"/"+(now.getMonth()+1)+"/"+now.getUTCDate();
    const time = now.getUTCHours()+":"+(now.getUTCMinutes())+":"+now.getUTCSeconds();
    return (date+" "+time);
  }

  getUserName(){
    if(this.user!=undefined){
    const uid = this.user.uid;
    const path = `users/${uid}`;

    return this._db.object(path)
    }else{
      return null;
    }
  }

  getUsers(){
    return this._db.list('users');
  }
}
