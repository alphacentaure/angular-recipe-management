import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, Data } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';

import { IngredientDetailComponent } from './ingredient-detail.component';
import { IngredientService } from '../service/ingredient.service';

describe('IngredientDetailComponent', () => {
  let component: IngredientDetailComponent;
  let fixture: ComponentFixture<IngredientDetailComponent>;

  let dummyData: Data = { id: 1, name: 'Name 1', quantity: '1 quantity' };

  const mockActivatedRoute = {
    snapshot: {
      params: {
        id: '1',
      },
    },
  };

  beforeEach(async () => {
    let IngredientServiceFake = {
      get(id: number): Observable<Data> {
        return of(dummyData);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [IngredientDetailComponent],
      imports: [MatCardModule, MatDividerModule, MatIconModule],
      providers: [
        {
          provide: IngredientService,
          useValue: IngredientServiceFake,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('activated route should show the ID of the ingredient', () => {
    let testEl = fixture.debugElement.query(By.css('mat-card-subtitle'));
    expect(testEl.nativeElement.textContent).toEqual(
      'assignment Ingredient ID : 1'
    );
  });

  it('getIngredient() by id should return a specific ingredient', () => {
    const data: Data = { id: 1, name: 'Name 1', quantity: '1 quantity' };
    expect(component.ingredient).toEqual(data);
  });
});
