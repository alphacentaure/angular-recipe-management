import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from '../model/ingredient';
import { IngredientService } from '../service/ingredient.service';

@Component({
  selector: 'app-ingredient-detail',
  templateUrl: './ingredient-detail.component.html',
  styleUrl: './ingredient-detail.component.css',
})
export class IngredientDetailComponent implements OnInit, OnDestroy {
  public ingredient: Ingredient = {};
  private dataSub$: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private service: IngredientService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getProduct(id);
  }

  ngOnDestroy(): void {
    this.dataSub$?.unsubscribe();
  }

  private getProduct(id: number) {
    this.dataSub$ = this.service.get(id).subscribe((data) => {
      if (data) {
        this.ingredient = data;
      }
    });
  }
}
