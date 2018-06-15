import { Component, OnInit, Input } from '@angular/core';
import { ChatMessage } from '../models/chat-message.model';

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

  constructor() { 
  }

  ngOnInit(chatMessage=this.chatMessage) {
    this.messageContent = chatMessage.message;
    this.userEmail= chatMessage.email;
    this.userName= chatMessage.userName;
    this.timeStamp = chatMessage.timeSent;
  }

}
