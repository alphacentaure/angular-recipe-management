import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IngredientModule } from './ingredient/ingredient.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularmaterialselectionModule } from './angularmaterialselection/angularmaterialselection.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IngredientModule,
    HttpClientModule,
    FormsModule,
    AngularmaterialselectionModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
