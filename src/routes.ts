import { Routes } from "@angular/router";
import { SignupFormComponent } from "./app/signup-form/signup-form.component";
import { LoginFormComponent } from "./app/login-form/login-form.component";
import { ChatroomComponent } from "./app/chatroom/chatroom.component";
import { HelperComponent } from "./app/helper/helper.component";

export const routes: Routes=[
    {path:'signup', component:SignupFormComponent},
    {path:'login', component:LoginFormComponent},
    {path:'chat', component:ChatroomComponent},
    {path:'notification', component:HelperComponent},
    {path:'', redirectTo:'/login', pathMatch:'full'}
];
 