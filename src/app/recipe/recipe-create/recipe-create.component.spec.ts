import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';
import { Data } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeCreateComponent } from './recipe-create.component';
import { RecipeService } from '../service/recipe.service';

describe('RecipeCreateComponent', () => {
  let component: RecipeCreateComponent;
  let fixture: ComponentFixture<RecipeCreateComponent>;

  let dummyData: Data = { id: 1, name: 'Testing Data 1' };

  beforeEach(async () => {
    let RecipeServiceFake = {
      create(): Observable<Data> {
        return of(dummyData);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [RecipeCreateComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: RecipeService,
          useValue: RecipeServiceFake,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should POST a recipe', () => {
    const data: Data = { name: 'Testing Data 1' };
    const expectedData: Data = { id: 1, name: 'Testing Data 1' };

    component.addRecipe(data);
    expect(component.recipe).toEqual(expectedData);
  });
});
