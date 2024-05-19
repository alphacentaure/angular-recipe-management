import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IngredientRoutingModule } from './ingredient-routing.module';
import { IngredientService } from './service/ingredient.service';
import { IngredientUpdateComponent } from './ingredient-update/ingredient-update.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { IngredientDetailComponent } from './ingredient-detail/ingredient-detail.component';
import { IngredientDeleteComponent } from './ingredient-delete/ingredient-delete.component';
import { IngredientCreateComponent } from './ingredient-create/ingredient-create.component';
import { AngularmaterialselectionModule } from '../angularmaterialselection/angularmaterialselection.module';

@NgModule({
  declarations: [
    IngredientListComponent,
    IngredientDetailComponent,
    IngredientDeleteComponent,
    IngredientCreateComponent,
    IngredientUpdateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IngredientRoutingModule,
    AngularmaterialselectionModule

  ],
  providers: [IngredientService]
})
export class IngredientModule {}
