import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, Data } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { By } from '@angular/platform-browser';
import { RecipeService } from '../../service/recipe.service';
import { RecipeDetailComponent } from './recipe-detail.component';

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;
  
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
      get(id:number): Observable<Data> {
        return of(dummyData);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [RecipeDetailComponent],
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
    
    fixture = TestBed.createComponent(RecipeDetailComponent);
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
    expect(component.recipe).toEqual(datas);
  });

});
