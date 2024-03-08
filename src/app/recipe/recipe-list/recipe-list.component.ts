import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../model/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  public selectedRecipe: Recipe | undefined;
  public recipes: Recipe[] = [];
  public flags: boolean = false;
  private dataSub$ = new Subject<void>();

  displayedColumns: string[] = [
    'id',
    'name',
    'descr',
    'instr.',
    'List of ingred.',
    'createdOn',
    'updaedOn',
    'menulist',
  ];

  constructor(public service: RecipeService, public router: Router) {}

  public onCreate() {
    this.router.navigate(['./recipes/recipecreate']);
  }

  public onDetail(data: string) {
    this.router.navigate(['./recipes/recipedetail', data]);
  }

  public onUpdate(data: string) {
    this.router.navigate(['./recipes/recipeupdate', data]);
  }

  public onDelete(data: string) {
    this.router.navigate(['./recipes/recipedelete', data]);
  }

  getRecipes() {
    this.service
      .getAll()
      .pipe(takeUntil(this.dataSub$)) //the pipe and the takeUntil : will subscribe and unsubscribe when complete
      .subscribe((_datas) => {
        if (_datas) {
          this.recipes = _datas;
          this.flags = true;
        } else {
          console.log('error recipes inside RecipeListComponent');
        }
      });
  }

  ngOnInit(): void {
    this.getRecipes();    
  }
}
