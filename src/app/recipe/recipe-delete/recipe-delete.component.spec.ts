import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, Data } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { RecipeDeleteComponent } from './recipe-delete.component';
import { RecipeService } from '../service/recipe.service';

describe('RecipeDeleteComponent', () => {
  let component: RecipeDeleteComponent;
  let fixture: ComponentFixture<RecipeDeleteComponent>;
  
  let dummyData: Data = { id: 1, name: 'Testing Data 1' };

  const mockActivatedRoute = {
    snapshot: {
      params: {
        id: '1'
      }
    }
  };

  beforeEach(async () => {
    let RecipeServiceFake = {
      delete(id:number): Observable<Data> {
        return of(dummyData);
      },
      get(id:number): Observable<Data> {
        return of(dummyData);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [RecipeDeleteComponent],
      imports: [MatCardModule,MatDividerModule,MatIconModule],
      providers: [
        {
          provide: RecipeService,
          useValue: RecipeServiceFake,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        }        
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('activated route should show the ID of the Recipe', () => {
    let testEl = fixture.debugElement.query(By.css('mat-card-subtitle'));
    expect(testEl.nativeElement.textContent).toEqual('assignment Recipe ID : 1');
  });

  it('getRecipes() by id should return one recipe', () => {
    const datas: Data = { id: 1, name: 'Testing Data 1' };
    console.log(
      JSON.stringify(
        'component.recipes après= ' + JSON.stringify(component.recipe)
      )
    );
    expect(component.recipe).toEqual(datas);
  });

  it('deleteRecipe() should return one recipe', () => {
    const datas: Data = { id: 1, name: 'Testing Data 1' };
    console.log(
      JSON.stringify(
        'component.recipes après= ' + JSON.stringify(component.recipe)
      )
    );
    component.deleteRecipe();
    expect(component.recipe).toEqual(datas);
  });

});
