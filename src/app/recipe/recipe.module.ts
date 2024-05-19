import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecipeRoutingModule } from './recipe-routing.module';

import { RecipeService } from './service/recipe.service';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeDeleteComponent } from './recipe-delete/recipe-delete.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeUpdateComponent } from './recipe-update/recipe-update.component';
import { AngularmaterialselectionModule } from '../angularmaterialselection/angularmaterialselection.module';


@NgModule({
  declarations: [
    RecipeCreateComponent,
    RecipeListComponent,
    RecipeDeleteComponent,
    RecipeDetailComponent,
    RecipeUpdateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RecipeRoutingModule,
    AngularmaterialselectionModule
  ],
  providers: [RecipeService],
})
export class RecipeModule {}
