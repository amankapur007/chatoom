import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { ChatMessage } from '../models/chat-message.model';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {

  feeds:FirebaseListObservable<ChatMessage[]>;

  constructor(private _database: DatabaseService, ) { }

  ngOnInit() {
    this.feeds = this._database.getMessages();
  }

  ngOnChanges(){
    this.feeds =this._database.getMessages();
  }

}
