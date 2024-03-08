import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Data } from '@angular/router';
import { IngredientService } from './ingredient.service';

describe('IngredientService', () => {
  let service: IngredientService;
  let httpTestingController: HttpTestingController;  
  const url = 'http://localhost:8080/api/v1/ingredient';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(IngredientService);
  });

  /// Tests begin ///
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Ingredient service should GET a list of data', () => {
    const datas: Data[] = [
      {id: 1, name: 'Name ingredient 1', quantity: '1 quantity'},
      {id: 2, name: 'Name ingredient 2', quantity: '2 quantity'},
      {id: 3, name: 'Name ingredient 3', quantity: '3 quantity'}  
    ];

    // Make an HTTP GET request
    service.getAll()
      .subscribe(_data =>{
        expect(_data).toEqual(datas);
        expect(_data).toHaveSize(3);
        }
      );
  
    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne(url);
  
    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');
  
    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(datas);
  
    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });

  it('Ingredient service should GET one data', () => {
    const id : number = 1;
    const data : Data = {id: 1, name: 'Name ingredient 1', quantity: '1 quantity'};

    service.get(id)
      .subscribe(_data =>{
        expect(_data).toEqual(data);  
        }
      );
  
    const req = httpTestingController.expectOne(`${url}/${id}`);
  
    expect(req.request.method).toEqual('GET');
  
    req.flush(data);
  
    httpTestingController.verify();
  });

  it('Ingredient service should POST one data', () => {
    const data : Data = {id: 1, name: 'Name ingredient 1', quantity: '1 quantity'};

    service.create(data)
      .subscribe(_data =>{
        expect(_data).toEqual(data);
        }
      );
  
    const req = httpTestingController.expectOne(url);
  
    expect(req.request.method).toEqual('POST');

    req.flush(data);
  
    httpTestingController.verify();
  });

  it('Ingredient service should PUT one data', () => {
    const id : number = 1;
    const data : Data = {id:1, name: 'Testing Data 1'}

    service.update(data)
      .subscribe(_data =>{
        expect(_data).toEqual(data);
        }
      );
  
    const req = httpTestingController.expectOne(`${url}/${id}`);
  
    expect(req.request.method).toEqual('PUT');
  
    req.flush(data);
  
    httpTestingController.verify();
  });

  it('Ingredient service should DELETE one data', () => {
    const id : number = 1;
    const data : Data = {id: 1, name: 'Name ingredient 1', quantity: '1 quantity'};

    service.delete(id)
      .subscribe(_data =>{
        expect(_data).toEqual(data);
        }
      );
  
    const req = httpTestingController.expectOne(`${url}/${id}`);
  
    expect(req.request.method).toEqual('DELETE');
  
    req.flush(data);
  
    httpTestingController.verify();
  });
    
});
