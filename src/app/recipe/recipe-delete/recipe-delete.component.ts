import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-recipe-delete',
  templateUrl: './recipe-delete.component.html',
  styleUrl: './recipe-delete.component.css',
})
export class RecipeDeleteComponent {
  public recipe: Recipe = {};
  private dataSub$: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RecipeService
  ) {}

  public recipeForm = new FormGroup({
    id: new FormControl<string>('', { nonNullable: true }),
    name: new FormControl<string>('', { nonNullable: true }),
  });

  public deleteRecipe(): void {
    if (this.recipe.id) {
      this.service
        .delete(this.recipe.id)
        .subscribe((_data) => {
          console.log('data after deletion = ' + JSON.stringify(_data));
          this.recipe = _data;
          this.goBackToRecipes();
        });
    } else {
      console.log('error recipes inside RecipeDeleteComponent');
    }
  }

  goBackToRecipes(): void {
    this.router.navigate(['./recipes']);
    //this.router.navigate(['./recipe/recipecreate']);
    //this.router.navigate(['']);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getRecipe(id);
  }

  ngOnDestroy(): void {
    this.dataSub$?.unsubscribe();
  }

  public getRecipe(id: number) {
    this.dataSub$ = this.service
      .get(id)
      .subscribe((data) => {
        if (data) {
          console.log('data = ' + data.name);
          // this.recipeId = Number(data.id);
          this.recipe = data;
        }
      });
  }
}
