import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IngredientService } from '../service/ingredient.service';
import { Ingredient } from '../model/ingredient';

@Component({
  selector: 'app-ingredient-create',
  templateUrl: './ingredient-create.component.html',
  styleUrl: './ingredient-create.component.css',
})
export class IngredientCreateComponent {
  public ingredient: Ingredient = {};

  constructor(private service: IngredientService, public router: Router) {}

  public ingredientForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true }),
    quantity: new FormControl<string>('', { nonNullable: true }),
  });

  get name() {
    return this.ingredientForm.controls.name;
  }
  get quantity() {
    return this.ingredientForm.controls.quantity;
  }

  public filledIngredient() {
    this.ingredient = {
      name: this.name.value,
      quantity: this.quantity.value,
    };

    if (
      this.ingredient.name != undefined && 
      this.ingredient.name.trim() != ''
    ) {
      this.addIngredient(this.ingredient);
    } else {
      console.log('error field name inside IngredientCreateComponent');
    }
  }

  public addIngredient(data: Ingredient): void {
    this.service.create(data).subscribe((_data) => {
      this.ingredient = _data;
      this.goBackToIngredients();
    });
  }

  goBackToIngredients(): void {
    this.router.navigate(['./ingredients']);
  }
}
