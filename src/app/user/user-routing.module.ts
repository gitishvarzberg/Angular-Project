import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';


const User_ROUTE: Route[] = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "logout", component: LogoutComponent },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(User_ROUTE)
  ],
  exports:[RouterModule]
})
export class UserRoutingModule { }
