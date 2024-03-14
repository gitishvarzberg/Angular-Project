import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmallRecipeComponent } from './small-recipe/small-recipe.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipRoutingModule } from './recip-routing.module';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { PreparationTimePipe } from '../preparation-time.pipe';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { EditRecipComponent } from './edit-recip/edit-recip.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [AllRecipesComponent, SmallRecipeComponent, RecipeDetailsComponent, AddRecipeComponent, EditRecipComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    RecipRoutingModule,
    PreparationTimePipe,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    AsyncPipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
})
export class RecipeModule { }
