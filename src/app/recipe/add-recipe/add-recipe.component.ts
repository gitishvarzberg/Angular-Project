
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../recip.model';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../category.model';
import { RecipService } from '../../services/recip.service';
import { Router } from '@angular/router';
import { User } from '../../user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent implements OnInit {
  constructor(private _recipeService: RecipService, private router: Router) { }
  addRecipe: FormGroup;
  recipe: Recipe;
  options: string[];
  categories: Category[] = [];
  productsList: string[] = [];
  instructionsList: string[] = [];
  selectedCategory: FormControl;
  detailsJsonString: string;
  retrievedDetails: User;
  // isAddProuduct:boolean
  user: User
  ngOnInit(): void {
    this.recipe = this._recipeService.recipe
    this.selectedCategory = new FormControl();
    this.addRecipe = new FormGroup({
      "name": new FormControl('',Validators.required),
      "level_of_difficulty": new FormControl('',[Validators.required,Validators.max(5),Validators.min(1)]),
      "picture_Recipe": new FormControl('',Validators.required),
      "preparation_time": new FormControl('',Validators.required),
      "products": new FormArray([],Validators.required),
      "instructions": new FormArray([],Validators.required),
    })
    this._recipeService.getCategoriesFromServer().subscribe({
      next: (res) => {
        this.categories = res;
        this.options = this.categories.map(category => category.name);
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.detailsJsonString = sessionStorage.getItem('userDetails');
    this.retrievedDetails = JSON.parse(this.detailsJsonString);

  }
  addProductControl(product: string): void {
    const productControl = new FormControl(product);
    (this.addRecipe.get('products') as FormArray).push(productControl);
  }
  addProduct() {

    const productsArray = this.addRecipe.get('products') as FormArray;
    productsArray.push(new FormControl(''));
  }

  onProductInputChange(control: FormControl, index: number): void {
    const value = control.value;
    const productsArray = this.addRecipe.get('products') as FormArray;

    if (!value && productsArray.length > index) {
      productsArray.removeAt(index);
    }
  }
  addInstructionsControl(instruction: string): void {
    const instructionControl = new FormControl(instruction);
    (this.addRecipe.get('instructions') as FormArray).push(instructionControl)
  }

  addInstructions() {
    const instructionsArray = this.addRecipe.get('instructions') as FormArray;
    instructionsArray.push(new FormControl(''));
  }

  onInstructionsInputChange(control: FormControl, index: number): void {
    const value = control.value;
    const instructionsArray = this.addRecipe.get('instructions') as FormArray;

    if (!value && instructionsArray.length > index) {
      instructionsArray.removeAt(index);
    }
  }

  submit() {
    if(!this.addRecipe.valid){      
      Swal.fire({
        title: "אחד הפריטים שהכנסת אינו תקין או שלא מלאתה את כל השדות ",
        icon: "error"
      });
      return;
    }
    let r: Recipe = this.addRecipe.value
    r.code = RecipService.code++
    r.code_Chef = this.retrievedDetails.code
    r.category = new Category
    r.category.name = this.selectedCategory.value;
    for (let i = 0; i < this.categories.length; i++) {
      if (r.category.name == this.categories[i].name) {
        r.category.code = this.categories[i].code
        r.category.icon = this.categories[i].icon
      }
    }
    this._recipeService.save(r).subscribe({
      next: (res) => {
        console.log(r)
        Swal.fire({
          title: "המתכון נוסף בהצלחה",
          icon: "success"
        });
        this.router.navigate(['/recipe'])
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}











