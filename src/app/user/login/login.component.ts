
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../user.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  @Input() item = 'name';
  public users: User[]
  public addForm: FormGroup
  public inValidPassWord: boolean;
  public UserNotFound: boolean;
  constructor(private _userService: UserService, private router: Router) { }
  ngOnInit(): void {
    this.addForm = new FormGroup({
      "name": new FormControl('', Validators.required),
      "password": new FormControl('', [Validators.required, Validators.minLength(3)]),
    })

    this._userService.getUsersFromServer().subscribe(
      {
        next: (res) => {
          this.users = res;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
  save() {
    let u: User = this.addForm.value
    this.inValidPassWord = false
    this.UserNotFound = false
    this.users.forEach(element => {
      if (element.name === u.name) {
        this.UserNotFound = true
        if (element.password === u.password) {
          this._userService.details = element
          this._userService.saveUserToSessionStorage()
          this.router.navigate(["/recipe"])
          return;
        }
        if (element.password !== u.password) {
          this.inValidPassWord = true;
          return;
        }
      }
    });
    if (this.UserNotFound === false) {
      this._userService.name = u.name
      this.router.navigate(['user/register'])
    }
  }
}

