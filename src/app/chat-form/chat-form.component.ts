import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { Event } from '@firebase/database/dist/src/core/view/Event';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  message:string;
  constructor(private _chatService: ChatService) { }

  ngOnInit() {
  }

  send(){
    this._chatService.sendMessage(this.message);
    this,this.message= '';
  }

  handleEvent(event){
    if(event.keyCode == 13){
      this.send();
    }
  }
}
