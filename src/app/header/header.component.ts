import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserModule } from '../user/user.module';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,UserModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  async navaddrecipe() {
  if(sessionStorage.length!=0){
    this.router.navigate(['/recipe/add-recipe'])
  }
  else {
    const { value: accept } = await Swal.fire({
      title: "על מנת לאפשר לך לראות את פירטי המתכון עליך להרשם",
      inputValue: 1,
    });
    if (accept) {
      this.router.navigate(['/user'])
    }
  }

}
navallrecipes() {
this.router.navigate(['/recipe'])
}
navlogout() {
  this.router.navigate(['/user/logout'])
  Swal.fire({
    title: "אינך רשום",
  });
  return;
}
constructor(private router:Router){}
navlogin(){
    this.router.navigate(['/user'])
  }
navregister(){
    this.router.navigate(['/user/register'])

}
  
}
