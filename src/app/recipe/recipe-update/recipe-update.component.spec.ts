import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, Data } from '@angular/router';
import { Observable, of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RecipeUpdateComponent } from './recipe-update.component';
import { RecipeService } from '../service/recipe.service';

describe('RecipeUpdateComponent', () => {
  let component: RecipeUpdateComponent;
  let fixture: ComponentFixture<RecipeUpdateComponent>;

  let dummyData: Data = { id: 1, name: 'Testing Data 1' };

  const mockActivatedRoute = {
    snapshot: {
      params: {
        id: '1',
      },
    },
  };

  beforeEach(async () => {
    let RecipeServiceFake = {
      update(id: number): Observable<Data> {
        return of(dummyData);
      },
      get(id: number): Observable<Data> {
        return of(dummyData);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [RecipeUpdateComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: RecipeService,
          useValue: RecipeServiceFake,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('activated route should show the ID of the Recipe', () => {
    let testEl = fixture.debugElement.query(By.css('h1'));
    expect(testEl.nativeElement.textContent).toEqual('Update a recipe 1');
  });

  it('getRecipes() by id should return one recipe', () => {
    const datas: Data = { id: 1, name: 'Testing Data 1' };
    expect(component.recipe).toEqual(datas);
  });

  it('should update a recipe', () => {
    const expectedData: Data = { id: 1, name: 'Testing Data 1' };
    component.onUpdateRecipe();
    expect(component.recipe).toEqual(expectedData);
  });
});
