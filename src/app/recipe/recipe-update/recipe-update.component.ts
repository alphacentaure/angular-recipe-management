import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../model/recipe';

@Component({
  selector: 'app-recipe-update',
  templateUrl: './recipe-update.component.html',
  styleUrl: './recipe-update.component.css',
})
export class RecipeUpdateComponent {
  public recipe: Recipe = {};
  private dataSub$: Subscription | undefined;
  public recipeId: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  public onUpdateRecipe(): void {
    if (this.recipe.id) {
    
      this.recipeService
        .update(this.recipe)
        .subscribe((_data) => {
          this.recipe = _data;
          this.goBackToRecipes();
        });

    } else {
      console.log('error recipes inside RecipeUpdateComponent');
    }
  }

  goBackToRecipes(): void {
    this.router.navigate(['./recipes']);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getRecipe(id);
  }

  ngOnDestroy(): void {
    this.dataSub$?.unsubscribe();
  }

  public getRecipe(id: number) {
    this.dataSub$ = this.recipeService
      .get(id)
      .subscribe((_data) => {
        if (_data) {
          console.log('data = ' + _data.name);
          //         this.recipeId = data?.id;
          this.recipe = _data;
        }
      });
  }
  
}
