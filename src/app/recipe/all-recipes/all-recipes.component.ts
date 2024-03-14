import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import { Category } from '../../category.model';
import { Recipe } from '../../recip.model';
import { RecipService } from '../../services/recip.service';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.css',
})
export class AllRecipesComponent implements OnInit {
  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]> = new Observable<string[]>();
  selectedOption: number;
  filterOption: string;
  recipeTime: number;
  recipeName: string = '';
  categories: Category[] = [];
  recipes: Recipe[] = [];
  currentPage: number = 1;
  recipesPerPage: number = 1;
  selected: FormControl<any>;
  disableSelect = new FormControl(false);


  constructor(private _recipeService: RecipService) { }

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this._recipeService.getRecipesFromServer().subscribe(
      {
        next: (res) => {
          this.recipes = res;
          this.filterRecip('');
        },
        error: (err) => {
          console.log(err);
        }
      });

    this._recipeService.getCategoriesFromServer().subscribe(
      {
        next: (res) => {
          this.categories = res;
          for (let i = 0; i < this.categories.length; i++) {
            this.options[i] = this.categories[i].name
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
  filteredRecipes1 = [...this.recipes];
  filterRecip(name: string) {
    this.filteredRecipes1 = this.recipes.filter(recipe => recipe.name.includes(name));
  }

  filteredRecipes3 = [...this.recipes];
  filterRecipTime(time: number) {
    this.filteredRecipes1 = this.recipes.filter(recipe => recipe.preparation_time == time);
  }

  filteredRecipes2 = [...this.recipes]
  onSelectChange(newValue: any): void {
    this.selectedOption = newValue;
    this.filteredRecipes1 = this.recipes.filter(recipe => recipe.category.code == this.selectedOption)
  }
  onFilterOption(newValue: any): void {
    this.filterOption = newValue;
    this.filteredRecipes1 = this.recipes.filter(recipe => recipe.category.code == this.selectedOption)
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  filterRecipNone() {
    this.filteredRecipes1 = this.recipes;
  }

}