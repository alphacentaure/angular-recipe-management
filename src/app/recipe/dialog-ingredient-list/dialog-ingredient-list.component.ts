import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';

import { Subject, takeUntil } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Ingredient } from '../../ingredient/model/ingredient';
import { IngredientService } from '../../ingredient/service/ingredient.service';

@Component({
  selector: 'app-dialog-ingredient-list',
  templateUrl: './dialog-ingredient-list.component.html',
  styleUrl: './dialog-ingredient-list.component.css',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatTableModule,
    MatIconModule,
  ],
})
export class DialogIngredientListComponent implements OnInit {
  public selectedIngredient: Ingredient = {};
  public ingredients: Ingredient[] = [];
  private dataSub$ = new Subject<void>();
  public flags: boolean = false;

  displayedColumns: string[] = ['id', 'name', 'quantity.', 'star'];  

  constructor(
    public service: IngredientService,
    public dialogRef: MatDialogRef<DialogIngredientListComponent>
  ) {}

  getIngredients() {
    this.service
      .getAll()
      .pipe(takeUntil(this.dataSub$)) //the pipe and the takeUntil : will subscribe and unsubscribe when complete
      .subscribe((_datas) => {
        if (_datas) {
          console.log('data length = ' + _datas.length);
          this.ingredients = _datas;
          this.flags = true;
        } else {
          console.log('error Ingredients inside DialogIngredientListComponent');
        }
      });
  }

  ngOnInit(): void {
    this.getIngredients();
  }

}
