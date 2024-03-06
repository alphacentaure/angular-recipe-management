import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Data } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeService } from '../service/recipe.service';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;

  let dummyData: Data = [
    { id: 1, name: 'Testing Data 1' },
    { id: 2, name: 'Testing Data 2' },
    { id: 3, name: 'Testing Data 3' },
  ];
 
  beforeEach(async () => {
    let RecipeServiceFake = {
      getAll(): Observable<Data> {
        return of(dummyData);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [RecipeListComponent],
      imports: [MatTableModule],
      providers: [
        {
          provide: RecipeService,
          useValue: RecipeServiceFake,
        },
      ],

    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('getRecipes() should have the recipes list load', () => {
    const datas: Data[] = [
      { id: 1, name: 'Testing Data 1' },
      { id: 2, name: 'Testing Data 2' },
      { id: 3, name: 'Testing Data 3' },
    ];
    console.log(
      JSON.stringify(
        'component.recipes après= ' + JSON.stringify(component.recipes)
      )
    );
    expect(component.recipes).toEqual(datas);
    expect(component.recipes).toHaveSize(3);
  });
  
});
