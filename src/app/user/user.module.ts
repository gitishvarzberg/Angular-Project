import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [LoginComponent,RegisterComponent,LogoutComponent],
  imports: [
    CommonModule,ReactiveFormsModule,FormsModule,RouterModule,UserRoutingModule,MatSlideToggleModule
  ]
})
export class UserModule { }
