import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../service/recipe.service';
import { Ingredient } from '../../ingredient/model/ingredient';
import { DialogIngredientListComponent } from '../dialog-ingredient-list/dialog-ingredient-list.component';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  public recipe: Recipe | any;
  private dataSub$: Subscription | undefined;
  public ingredients: Ingredient[] = [];
  private selectedIngredient: Ingredient | any;

  displayedColumns: string[] = [
    'id',
    'name',
    'quantity',
    'createdOn',
    'updaedOn',
    'menuRemove',
  ];

  constructor(
    private route: ActivatedRoute,

    public dialog: MatDialog,
    private service: RecipeService
  ) {}

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(DialogIngredientListComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.selectedIngredient = result;
      if (result) {
        this.addSelectedIngredientToRecipe(result);
      }
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getRecipe(id);
  }

  ngOnDestroy(): void {
    this.dataSub$?.unsubscribe();
  }

  public onRemoveIngredient(data: Ingredient) {
    this.removeSelectedIngredientToRecipe(data);
  }

  getRecipe(id: number) {
    this.dataSub$ = this.service.get(id).subscribe((data) => {
      if (data) {
        this.recipe = data;
        this.ingredients =
          data.ingredients == undefined ? [] : data.ingredients;
      } else {
        console.log('error recipes inside RecipeDetailComponent');
      }
    });
  }

  addSelectedIngredientToRecipe(ingredient: Ingredient): void {
    {
      this.service
        .addIngredientToRecipe(this.recipe.id, ingredient)
        .subscribe((data) => {
          if (data) {
            this.recipe = data;
            this.ingredients =
              data.ingredients == undefined ? [] : data.ingredients;
          }
        });
    }
  }

  removeSelectedIngredientToRecipe(ingredient: Ingredient): void {
    {
      this.service
        .removeIngredientFromRecipe(this.recipe.id, ingredient)
        .subscribe((data) => {
          if (data) {
            this.recipe = data;
            this.ingredients =
              data.ingredients == undefined ? [] : data.ingredients;
          }
        });
    }
  }
}
