import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges {

  userList:FirebaseListObservable<User[]>;

  constructor( private _chatService: ChatService) { }

  ngOnInit() {
    this.userList = this._chatService.getUsers();
  }

  ngOnChanges(){
    this.userList = this._chatService.getUsers();
  }

  status(user: User){
    if(user.status === 'online'){
        return {"color":"green"}
    }else{
      return {"color":"red"}
    }
  }
}
