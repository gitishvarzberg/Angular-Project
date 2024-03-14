import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Recipe } from '../../recip.model';
import { RecipService } from '../../services/recip.service';
import { Category } from '../../category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-recip',
  templateUrl: './edit-recip.component.html',
  styleUrl: './edit-recip.component.css'
})
export class EditRecipComponent implements OnInit {

  constructor(private _recipeService: RecipService, private router: Router) { }

  editRecipe: FormGroup;
  recipe: Recipe;
  options: string[];
  categories: Category[] = [];
  productsList: string[] = [];
  instructionsList: string[] = [];
  selectedCategory: FormControl;

  ngOnInit(): void {
    this.recipe = this._recipeService.recipe
    this.selectedCategory = new FormControl(this.recipe.category ? this.recipe.category.name : '');
    this.editRecipe = new FormGroup({
      "name": new FormControl(this._recipeService.recipe.name),
      "level_of_difficulty": new FormControl(this._recipeService.recipe.level_of_difficulty),
      "picture_Recipe": new FormControl(this._recipeService.recipe.picture_Recipe),
      "preparation_time": new FormControl(this._recipeService.recipe.preparation_time),
      "products": new FormArray([]),
      "instructions": new FormArray([]),
    })

    this._recipeService.recipe.products.forEach(product => {
      this.addProductControl(product);
    });

    this._recipeService.recipe.instructions.forEach(ins => {
      this.addInstructionsControl(ins);
    });

    this._recipeService.getCategoriesFromServer().subscribe({
      next: (res) => {
        this.categories = res;
        this.options = this.categories.map(category => category.name);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }
  addProductControl(product: string): void {
    const productControl = new FormControl(product);
    (this.editRecipe.get('products') as FormArray).push(productControl);
  }
  addProduct() {
    const productsArray = this.editRecipe.get('products') as FormArray;
    productsArray.push(new FormControl(''));
  }

  onProductInputChange(control: FormControl, index: number): void {
    const value = control.value;
    const productsArray = this.editRecipe.get('products') as FormArray;

    if (!value && productsArray.length > index) {
      productsArray.removeAt(index);
    }
  }
  addInstructionsControl(instruction: string): void {
    const instructionControl = new FormControl(instruction);
    (this.editRecipe.get('instructions') as FormArray).push(instructionControl)
  }

  addInstructions() {
    const instructionsArray = this.editRecipe.get('instructions') as FormArray;
    instructionsArray.push(new FormControl(''));
  }

  onInstructionsInputChange(control: FormControl, index: number): void {
    const value = control.value;
    const instructionsArray = this.editRecipe.get('instructions') as FormArray;

    if (!value && instructionsArray.length > index) {
      instructionsArray.removeAt(index);
    }
  }

  submit() {
    let r: Recipe = this.editRecipe.value
    r.code = this._recipeService.recipe.code;
    r.code_Chef = this._recipeService.recipe.code_Chef
    r.category = new Category
    r.category.name = this.selectedCategory.value;
    for (let i = 0; i < this.categories.length; i++) {
      if (r.category.name == this.categories[i].name) {
        r.category.code = this.categories[i].code
        r.category.icon = this.categories[i].icon
      }
    }
    this._recipeService.putRecip(r).subscribe(
      response => {
        this.router.navigate(['/recipe'])
      },
      error => {
        console.error(error);
      }
    );
  }
}

