import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database-deprecated";
import { AngularFireAuthModule } from "angularfire2/auth";


import { AppComponent } from './app.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { FeedComponent } from './feed/feed.component';
import { MessageComponent } from './message/message.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserItemComponent } from './user-item/user-item.component';
import { routes } from '../routes';

import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';
import { environment } from '../environments/environment';
import { WindowService } from './services/window.service';
import { HelperComponent } from './helper/helper.component';
import { DatabaseService } from './services/database.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent,
    LoginFormComponent,
    SignupFormComponent,
    NavbarComponent,
    UserListComponent,
    UserItemComponent,
    HelperComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, ChatService, WindowService, DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
