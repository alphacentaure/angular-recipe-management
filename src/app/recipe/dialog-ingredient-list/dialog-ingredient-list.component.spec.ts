import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Data } from '@angular/router';
import { Observable, of } from 'rxjs';

import { MatTableModule } from '@angular/material/table';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogIngredientListComponent } from './dialog-ingredient-list.component';
import { IngredientService } from '../../ingredient/service/ingredient.service';

describe('DialogIngredientListComponent', () => {
  let component: DialogIngredientListComponent;
  let fixture: ComponentFixture<DialogIngredientListComponent>;

  let dummyData: Data = [
    {id: 1, name: 'Name dummy 1', quantity: '1 quantyt dummy'},
    {id: 2, name: 'Name dummy 2', quantity: '2 quantyt dummy'},
    {id: 3, name: 'Name dummy 3', quantity: '3 quantyt dummy'}
  ];
 
  beforeEach(async () => {
    let IngredientServiceFake = {
      getAll(): Observable<Data> {
        return of(dummyData);
      },
    };

    await TestBed.configureTestingModule({
      imports: [MatTableModule],
      providers: [
        DialogIngredientListComponent,
        {
          provide: IngredientService,
          useValue: IngredientServiceFake,
        },
        {
          provide: MatDialogRef,
          useValue: IngredientServiceFake
        }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogIngredientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
      
  it('getIngredients() should have the Ingredient list load', () => {
    const datas: Data[] = [
      {id: 1, name: 'Name dummy 1', quantity: '1 quantyt dummy'},
      {id: 2, name: 'Name dummy 2', quantity: '2 quantyt dummy'},
      {id: 3, name: 'Name dummy 3', quantity: '3 quantyt dummy'}
    ];
    
    expect(component.ingredients).toEqual(datas);
    expect(component.ingredients).toHaveSize(3);
  });
});
