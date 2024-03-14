import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserModule } from '../user/user.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,UserModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
navaddrecipe() {
this.router.navigate(['/recipe/add-recipe'])

}
navallrecipes() {
this.router.navigate(['/recipe'])
}
navlogout() {
  this.router.navigate(['/user/logout'])
}
constructor(private router:Router){}
navlogin(){
    this.router.navigate(['/user'])
  }
navregister(){
    this.router.navigate(['/user/register'])

}
  
}
