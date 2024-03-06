import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { RecipeRoutingModule } from './recipe-routing.module';

import { RecipeService } from './service/recipe.service';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeDeleteComponent } from './recipe-delete/recipe-delete.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeUpdateComponent } from './recipe-update/recipe-update.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    RecipeCreateComponent,
    RecipeListComponent,
    RecipeDeleteComponent,
    RecipeDetailComponent,
    RecipeUpdateComponent    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RecipeRoutingModule,
    MatTableModule,
    MatCardModule,MatDividerModule,MatIconModule,
    MatMenuTrigger,MatMenu,MatButtonModule,  
    MatMenuModule
    
  ],
  providers: [
    RecipeService
  ]
})
export class RecipeModule { }
