import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { Ingredient } from '../model/ingredient';
import { IngredientService } from '../service/ingredient.service';

@Component({
  selector: 'app-ingredient-update',
  templateUrl: './ingredient-update.component.html',
  styleUrl: './ingredient-update.component.css',
})
export class IngredientUpdateComponent {
  public ingredient: Ingredient = {};
  private dataSub$: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: IngredientService
  ) {}

  public updateIngredient(): void {
    this.service.update(this.ingredient).subscribe((_data) => {
      this.ingredient = _data;
      this.goBackToIngredients();
    });
  }

  goBackToIngredients(): void {
    this.router.navigate(['./ingredients']);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getIngredient(id);
  }

  ngOnDestroy(): void {
    this.dataSub$?.unsubscribe();
  }

  getIngredient(id: number) {
    this.dataSub$ = this.service.get(id).subscribe((_data) => {
      if (_data) {
        this.ingredient = _data;
      }
    });
  }
}
