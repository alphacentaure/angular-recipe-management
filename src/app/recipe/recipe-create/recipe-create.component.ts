import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrl: './recipe-create.component.css',
})
export class RecipeCreateComponent {
  public recipe: Recipe = {};

  constructor(private service: RecipeService, private router: Router) {}

  public recipeForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true }),
    description: new FormControl<string>('', { nonNullable: true }),
    instruction: new FormControl<string>('', { nonNullable: true }),
  });

  get name() {
    return this.recipeForm.controls.name;
  }

  get description() {
    return this.recipeForm.controls.description;
  }

  get instruction() {
    return this.recipeForm.controls.instruction;
  }

  public filledRecipe() {
    this.recipe = {
      name: this.name.value,
      description: this.description.value,
      instruction: this.instruction.value,
    };

    if (this.recipe.name != undefined && this.recipe.name.trim() != '') {
      this.addRecipe(this.recipe);
    } else {
      console.log('recipe recipes inside RecipeCreateComponent');
    }
  }

  public addRecipe(data: Recipe): void {
    this.service.create(data).subscribe((_data) => {
      this.recipe = _data;
      this.goBackToRecipes();
    });
  }

  goBackToRecipes(): void {
    this.router.navigate(['./recipes']);
  }
}
