import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeDeleteComponent } from './recipe-delete/recipe-delete.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeUpdateComponent } from './recipe-update/recipe-update.component';

const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipecreate', component: RecipeCreateComponent },
  { path: 'recipedelete/:id', component: RecipeDeleteComponent },
  { path: 'recipedetail/:id', component: RecipeDetailComponent },
  { path: 'recipeupdate/:id', component: RecipeUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
