import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../recip.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-small-recipe',
  templateUrl: './small-recipe.component.html',
  styleUrl: './small-recipe.component.css'
})

export class SmallRecipeComponent implements OnInit {

  @Input() recipe: Recipe;
  recipe2: Recipe;
  starsArray: string[] = [];
  constructor(private router: Router) { }
  ngOnInit(): void {
    this.starsArray = new Array(this.recipe.level_of_difficulty).fill('../assets/star1.jpg');
  }

  async showDetails(recip: Recipe) {
    console.log("recip.code", recip.code);
    if (sessionStorage.length != 0) {
      this.router.navigate(["/recipe/recipe-details",recip.code])
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
}
