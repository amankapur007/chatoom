import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { User } from '../models/user.model';
import { UserDetailsModel } from '../models/userdetails.model';
import { ChatMessage } from '../models/chat-message.model';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';

@Injectable()
export class DatabaseService {

  users: FirebaseListObservable<any>;
  user: firebase.User;
  chatMessages: FirebaseListObservable<ChatMessage[]>;
  chatMessage: ChatMessage;
  username: string;
  constructor(private _db: AngularFireDatabase, private _auth:AuthService) { 
  }

  storeUserData(uid:string, email: string, displayName: string, emailStatus: string) {
    const path = `users/${uid}`
    const data: UserDetailsModel = {
      emailId: email,
      displayName: displayName,
      accountVerfied: emailStatus,
      status:'-'
    }
    return this._db.object(path).update(data).catch((error)=>{
      console.log(error);
    });
  }

  getUsersData() {
    const path = "users"
    return this._db.list(path);
  }

  updateUserStatus(uid, emailId, status){
    const path=`users/${uid}`;
    const data: UserDetailsModel = {
      emailId:emailId,
      accountVerfied: 'verified',
      status:status
    }

    return this._db.object(path).update(data);
  }

  getUserName(user){
    if(user!=undefined){
    const uid = user.uid;
    const path = `users/${uid}`;

    return this._db.object(path)
    }else{
      return null;
    }
  }

  getUsers(){
    return this._db.list('users');
  }

  getMessages():FirebaseListObservable<ChatMessage[]>{
    return this._db.list('messages',{
      query:{
        limitToLast:25,
        orderByKey:true
      }
    });
  }

  sendMessage(msg: string){
    console.log(this.username);
    const timeStamp = this.getTimeStamp();
    const email:string = this._auth.getUser().email;
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message:msg,
      timeSent:timeStamp,
      userName: this._auth.getUser().username,
      email:email
    });
    console.log('Called Message')
  }

  getTimeStamp(){
    const now = new Date();
    const date = now.getUTCFullYear()+"/"+(now.getMonth()+1)+"/"+now.getUTCDate();
    const time = now.getUTCHours()+":"+(now.getUTCMinutes())+":"+now.getUTCSeconds();
    return (date+" "+time);
  }
}
