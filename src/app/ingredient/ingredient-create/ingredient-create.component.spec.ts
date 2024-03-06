import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Data } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ReactiveFormsModule } from '@angular/forms';
import { IngredientCreateComponent } from './ingredient-create.component';
import { IngredientService } from '../service/ingredient.service';

describe('IngredientCreateComponent', () => {
  let component: IngredientCreateComponent;
  let fixture: ComponentFixture<IngredientCreateComponent>;

  const dummyData : Data = {id: 1, name: 'Name 1', quantity: '1 quantity'};

  beforeEach(async () => {
    let IngredientServiceFake = {
      create(): Observable<Data> {
        return of(dummyData);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [IngredientCreateComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: IngredientService,
          useValue: IngredientServiceFake,
        },                
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should POST a ingredient', () => {
    const data : Data = {id: 1, name: 'Name 1', quantity: '1 quantity'};
    const expectedData : Data = {id: 1, name: 'Name 1', quantity: '1 quantity'};

    component.addIngredient(data);
    expect(component.ingredient).toEqual(expectedData);
  });
  
});
