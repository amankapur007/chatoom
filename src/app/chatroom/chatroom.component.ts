import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {

  @ViewChild("scroller") private feedContainer: ElementRef;

  constructor(private _authService: AuthService, private _router:Router) {
    this._authService.authUser().subscribe(user=>{
      if(user==null || user== undefined || 
          user.uid===null || user.uid===undefined){
        this._router.navigate(['/login']);
      }
    })
   }

  ngOnInit() {
    this._authService.authUser().subscribe(user=>{
      if(user==null || user== undefined || 
        user.uid===null || user.uid===undefined){
      this._router.navigate(['/login']);
    }
    })
  }

  scrollToBottom(): void{
    this.feedContainer.nativeElement.scrollTop
    = this.feedContainer.nativeElement.scrollHeight;  }

  ngAfterViewChecked(){
    this.scrollToBottom();
  }
}
