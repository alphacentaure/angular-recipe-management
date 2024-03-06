import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  /*{
    path: 'recipes',
    loadChildren: () =>
      import('./recipe/recipe.module').then((m) => m.CollectionModule),
  },*/
   
  {
    path: 'ingredients',
    loadChildren: () =>
      import('./ingredient/ingredient.module').then((m) => m.IngredientModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
