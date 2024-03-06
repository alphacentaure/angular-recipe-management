import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, Data } from '@angular/router';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { IngredientDeleteComponent } from './ingredient-delete.component';
import { IngredientService } from '../service/ingredient.service';

describe('IngredientDeleteComponent', () => {
  let component: IngredientDeleteComponent;
  let fixture: ComponentFixture<IngredientDeleteComponent>;

  let dummyData: Data = {id: 1, name: 'Name 1', quantity: '1 Quantity'};

  const mockActivatedRoute = {
    snapshot: {
      params: {
        id: '1'
      }
    }
  };

  beforeEach(async () => {
    let IngredientServiceFake = {
      delete(id:number): Observable<Data> {
        return of(dummyData);
      },
      get(id:number): Observable<Data> {
        return of(dummyData);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [IngredientDeleteComponent],
      imports: [MatCardModule,MatDividerModule,MatIconModule],
      providers: [
        {
          provide: IngredientService,
          useValue: IngredientServiceFake,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        }        
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('activated route should show the ID of the ingredient', () => {
    let testEl = fixture.debugElement.query(By.css('mat-card-subtitle'));
    expect(testEl.nativeElement.textContent).toEqual('assignment Ingredient ID : 1');
  });

  it('get() should return a specific ingredient', () => {
    const expectedData: Data = {id: 1, name: 'Name 1', quantity: '1 Quantity'};
    expect(component.ingredient).toEqual(expectedData);
  });

  it('deleteIngredient() should return one ingredient', () => {
    const expectedData: Data = {id: 1, name: 'Name 1', quantity: '1 Quantity'};
    component.deleteIngredient();
    expect(component.ingredient).toEqual(expectedData);
  });
  
});
