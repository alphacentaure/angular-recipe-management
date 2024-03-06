import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Ingredient } from '../model/ingredient';
import { IngredientService } from '../service/ingredient.service';

@Component({
  selector: 'app-ingredient-delete',
  templateUrl: './ingredient-delete.component.html',
  styleUrl: './ingredient-delete.component.css',
})
export class IngredientDeleteComponent implements OnInit {
  public ingredient: Ingredient = {};
  private dataSub$: Subscription | undefined;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,   
    private service: IngredientService
  ) {}

  public ingredientForm = new FormGroup({
    id: new FormControl<string>('', { nonNullable: true }),
    name: new FormControl<string>('', { nonNullable: true }),
    quantity: new FormControl<string>('', { nonNullable: true }),
  });

  public deleteIngredient(): void {
    if (this.ingredient.id) {
      this.service.delete(this.ingredient.id).subscribe((_data) => {
        this.ingredient = _data;
        this.goBackToIingredients();
      });
    } else {
      console.log('Ingredient id error');
    }
  }

  goBackToIingredients(): void {
    this.router.navigate(['./ingredients']);
    //this.router.navigate(['./']);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getIngredient(id);
  }

  ngOnDestroy(): void {
    this.dataSub$?.unsubscribe();
  }

  private getIngredient(id: number) {
    this.dataSub$ = this.service
      .get(id)
      .subscribe((data) => {
        if (data) {
          console.log('data = ' + data.name);
          this.ingredient = data;
        }
      });
  }
}
