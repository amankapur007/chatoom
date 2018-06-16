import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage:ChatMessage;
  messageContent: string;
  userName:string;
  userEmail:string;
  timeStamp:Date;
  isOwnMessage:boolean;
  constructor(private _authService:AuthService) { 
    this._authService.authUser().subscribe(user=>{
      if(user.email === this.userEmail){
        this.isOwnMessage = true
      }else{
        this.isOwnMessage = false;
      }
    })
  }

  ngOnInit(chatMessage=this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.userEmail= chatMessage.email;
    this.userName= chatMessage.userName;
    this.timeStamp = chatMessage.timeSent;
  }

  ownMessage(email: string){
    if(this.isOwnMessage){
      return {"background-color":"#3498DB",
        "padding": "6px 12px",   
        "word-wrap": "break-word",
        "width": "31%",
        "color":"white",
      }
    }else{
        return {"background-color":"#eee",
        "padding": "6px 12px",   
        "word-wrap": "break-word",
        "width": "31%"
      }
    }
  }

  messageStyle(){
    if(this.isOwnMessage){
    return {
      "padding": "6px 12px",
      "word-wrap": "break-word",
      "width": "69%",
      "background-color":"#D6EAF8"
    }
  }else{
    return {
      "padding": "6px 12px",
      "word-wrap": "break-word",
      "width": "69%"
    }
  }
  }

}
