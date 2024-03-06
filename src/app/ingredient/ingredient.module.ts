import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

import { IngredientRoutingModule } from './ingredient-routing.module';
import { IngredientService } from './service/ingredient.service';
import { IngredientUpdateComponent } from './ingredient-update/ingredient-update.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { IngredientDetailComponent } from './ingredient-detail/ingredient-detail.component';
import { IngredientDeleteComponent } from './ingredient-delete/ingredient-delete.component';
import { IngredientCreateComponent } from './ingredient-create/ingredient-create.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    IngredientListComponent,
    IngredientDetailComponent,
    IngredientDeleteComponent,
    IngredientCreateComponent,
    IngredientUpdateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDividerModule,MatIconModule,MatMenuModule,MatTableModule, // ingredientListComponent  
    MatCardModule,
    IngredientRoutingModule,MatButtonModule
  ], 
  providers: [
    IngredientService
  ]
})
export class IngredientModule { }
