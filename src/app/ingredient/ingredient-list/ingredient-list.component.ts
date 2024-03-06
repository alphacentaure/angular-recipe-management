import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { IngredientService } from '../service/ingredient.service';
import { Ingredient } from '../model/ingredient';


@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.css',
})
export class IngredientListComponent implements OnInit {
  public selectedIngredient: Ingredient | undefined;
  public ingredients: Ingredient[] = [];
  private dataSub$ = new Subject<void>();

  displayedColumns: string[] = [
    'id',
    'name',
    'quantity',
    'createdOn',
    'updaedOn',
    'menuIngredient',
  ];

  public flags: boolean = false;

  constructor(public service: IngredientService, public router: Router) {}

  public onCreate() {
    this.router.navigate(['./ingredients/ingredientcreate']);
  }

  public onDetail(data: string) {
    this.router.navigate(['./ingredients/ingredientdetail', data]);
  }

  public onUpdate(data: string) {
    this.router.navigate(['./ingredients/ingredientupdate/', data]);
  }

  public onDelete(data: string) {
    this.router.navigate(['./ingredients/ingredientdelete/', data]);
  }

  private getIngredients() {
    this.service
      .getAll()
      .pipe(takeUntil(this.dataSub$)) //the pipe and the takeUntil : will subscribe and unsubscribe when complete
      .subscribe((_datas) => {
        if (_datas) {
          this.ingredients = _datas;
          this.flags = true;
        }
      });
  }

  ngOnInit(): void {
    this.getIngredients();
  }
}
