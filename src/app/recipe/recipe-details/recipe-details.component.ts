import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../recip.model';
import { RecipService } from '../../services/recip.service';
import { CommonModule } from '@angular/common';
import { User } from '../../user.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent implements OnInit {

  public recipe!: Recipe
  public recipeId!: number
  starsArray: string[] = [];

  constructor(private route: ActivatedRoute, private _serviceRecip: RecipService, private router: Router) { }
  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.recipeId = param['code'];
      this._serviceRecip.getRecipById(this.recipeId).subscribe({
        next: (res) => {
          this.recipe = res
          this.starsArray = new Array(this.recipe.level_of_difficulty).fill('../assets/star1.jpg');
        },
        error: (err) => {
          console.log(err);
        }
      })
    })
  }
  IsCode_chef(): boolean {   
     console.log(this.recipe)
     console.log(this.recipe.code_Chef)

    const detailsJsonString = sessionStorage.getItem('userDetails');
    const retrievedDetails: User = JSON.parse(detailsJsonString);
      console.log(retrievedDetails.code)
    if (this.recipe.code_Chef === retrievedDetails.code) {
      console.log(this.recipe.code_Chef === retrievedDetails.code)
      return true;
    }
    return false;
  }
  navEditRecipe() {
    this._serviceRecip.recipe = this.recipe
    this.router.navigate(['/recipe/edit-recipe'])
  }
  deleteRecipe(): void {
    Swal.fire({
      title: "האם למחוק את המתכון",
      text: "! לא תוכל לשחזר את זה",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fed136",
      cancelButtonColor: "#d33",
      confirmButtonText: "למחוק"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "המתכון נמחק",
          icon: "success"
        });
        this._serviceRecip.delete(this.recipeId).subscribe({
          next: (res) => {
            this.router.navigate(["/recipe"]);
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }
}
