import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute, Data } from '@angular/router';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IngredientUpdateComponent } from './ingredient-update.component';
import { IngredientService } from '../service/ingredient.service';

describe('IngredientUpdateComponent', () => {
  let component: IngredientUpdateComponent;
  let fixture: ComponentFixture<IngredientUpdateComponent>;

  let dummyData: Data = {id: 1, name: 'Name ingredient 1', quantity: '1 quantity'};
  
  const mockActivatedRoute = {
    snapshot: {
      params: {
        id: '1'
      }
    }
  };

  beforeEach(async () => {
    let IngredientServiceFake = {
      update(id:number): Observable<Data> {
        return of(dummyData);
      },
      get(id:number): Observable<Data> {
        return of(dummyData);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [IngredientUpdateComponent],
      imports: [FormsModule,ReactiveFormsModule],
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
    
    fixture = TestBed.createComponent(IngredientUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('activated route should show the ID of the ingredient', () => {
    let testEl = fixture.debugElement.query(By.css('h1'));
    expect(testEl.nativeElement.textContent).toEqual('Update a ingredient 1');
  });

  it('getIngredient() by id should return a specific ingredient', () => {
    const data: Data = {id: 1, name: 'Name ingredient 1', quantity: '1 quantity'};
    expect(component.ingredient).toEqual(data);
  });

  it('should update a ingredient', () => {      
    const expectedData: Data = {id: 1, name: 'Name ingredient 1', quantity: '1 quantity'};
    component.updateIngredient();
    expect(component.ingredient).toEqual(expectedData);
  });

});
