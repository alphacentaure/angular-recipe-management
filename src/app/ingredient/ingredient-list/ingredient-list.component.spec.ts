import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Data } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { IngredientListComponent } from './ingredient-list.component';
import { IngredientService } from '../service/ingredient.service';


describe('IngredientListComponent', () => {
  let component: IngredientListComponent;
  let fixture: ComponentFixture<IngredientListComponent>;
  
  const dummyData: Data[] = [
    {id: 1, name: 'Name ingredient 1', quantity: '1 quantity'},
    {id: 2, name: 'Name ingredient 2', quantity: '2 quantity'},
    {id: 3, name: 'Name ingredient 3', quantity: '3 quantity'}
  ];

  beforeEach(async () => {
    let IngredientServiceFake = {
      getAll(): Observable<Data> {
        return of(dummyData);
      },
    };

    await TestBed.configureTestingModule({
      declarations: [IngredientListComponent],
      imports: [
        MatTableModule
      ],
      providers: [
        {
          provide: IngredientService,
          useValue: IngredientServiceFake,
        },
      ],

    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IngredientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
    
  it('getIngredients() should have the ingredient list load', () => {
    const datas: Data[] = [
      {id: 1, name: 'Name ingredient 1', quantity: '1 quantity'},
      {id: 2, name: 'Name ingredient 2', quantity: '2 quantity'},
      {id: 3, name: 'Name ingredient 3', quantity: '3 quantity'}  
    ];
    
    expect(component.ingredients).toEqual(datas);
    expect(component.ingredients).toHaveSize(3);
  });
});
