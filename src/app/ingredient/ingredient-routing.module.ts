import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientUpdateComponent } from './ingredient-update/ingredient-update.component';
import { IngredientDetailComponent } from './ingredient-detail/ingredient-detail.component';
import { IngredientDeleteComponent } from './ingredient-delete/ingredient-delete.component';
import { IngredientCreateComponent } from './ingredient-create/ingredient-create.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';

const routes: Routes = [
  { path: '', component: IngredientListComponent },
  { path: 'ingredientlist', component: IngredientListComponent },
  { path: 'ingredientcreate', component: IngredientCreateComponent },
  { path: 'ingredientdelete/:id', component: IngredientDeleteComponent },
  { path: 'ingredientdetail/:id', component: IngredientDetailComponent },
  { path: 'ingredientupdate/:id', component: IngredientUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientRoutingModule {}
