import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { User } from '../models/user.model';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnChanges {

  userList:FirebaseListObservable<User[]>;

  constructor( private _db: DatabaseService) { }

  ngOnInit() {
    this.userList = this._db.getUsers();
  }

  ngOnChanges(){
    this.userList = this._db.getUsers();
  }

  status(user: User){
    if(user.status === 'online'){
        return {"color":"#58D68D"}
    }else{
      return {"color":"#E74C3C"}
    }
  }
}
