import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../user.model';
import { UserService } from '../../services/user.service';

const emailRegEx =
/^([a-zA-Z]+[a-zA-Z0-9._-]*)@([a-zA-Z]+[a-zA-Z0-9._-]*)\.([a-zA-Z]+[a-zA-Z0-9._-]*)$/
const emailPatternValidator = (): ValidatorFn => {
  return (control: FormControl) => {
    return control.value && !control.value.match(emailRegEx)
      ? {
        email: true,
      }
      : null;
  };
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  public users: User[]
  public addForm: FormGroup
  public UserFound: boolean;

  constructor(private _userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      "name": new FormControl(this._userService.name, Validators.required),
      "password": new FormControl('', [Validators.required, Validators.minLength(3)]),
      "email": new FormControl('', [Validators.required, Validators.email]),
      "adress": new FormControl('', Validators.required),
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
    this.UserFound = false
    this.users.forEach(element => {
      if (element.name === u.name) {
        this.UserFound = true
      }
    });
    if (this.UserFound === false) {
      this._userService.save(u).subscribe({
        next: (res) => {
          this._userService.details = u;
          this._userService.saveUserToSessionStorage()
          this.router.navigate(['/recipe'])
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
}


