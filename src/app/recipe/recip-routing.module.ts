import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipComponent } from './edit-recip/edit-recip.component';

const RECIPE_ROUTES: Route[] = [
  { path: '', redirectTo: 'all-recipes', pathMatch: 'full' },
  { path: 'all-recipes', component: AllRecipesComponent },
  { path: 'recipe-details/:code', component: RecipeDetailsComponent },
  { path: 'add-recipe', component: AddRecipeComponent },
  { path: 'edit-recipe', component: EditRecipComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(RECIPE_ROUTES)
  ],
  exports: [RouterModule]
})
export class RecipRoutingModule { }
