import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';

import { HttpClient } from '@angular/common/http';
import { Data } from '@angular/router';
import { RecipeService } from './recipe.service';

describe('recipeService', () => {
  //let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: RecipeService;
  const url = 'http://localhost:8080/api/v1/recipe';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    
    // Inject the http service and test controller for each test
    //httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(RecipeService);
  });

  /// Tests begin ///
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('recipe service should GET a list of data', () => {
    const datas: Data[] = [
      {name: 'Testing Data'},
      {name: 'Testing Data1'},
      {name: 'Testing Data2'}
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

  it('recipe service should GET one data', () => {
    const id : number = 1;
    const data : Data = {id:1, name: 'Testing Data 1'}

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

  it('recipe service should POST one data', () => {
    const data : Data = {id:1, name: 'Testing Data'}

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

  it('recipe service should PUT one data', () => {
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
    
  it('recipe service should DELETE one data', () => {
    const id : number = 1;
    const data : Data = {id:1, name: 'Testing Data 1'}

    service.delete(id)
      .subscribe(_data =>{
        console.log("_data" + JSON.stringify(_data));
        expect(_data).toEqual(data);
        }
      );
  
    const req = httpTestingController.expectOne(`${url}/${id}`);
  
    expect(req.request.method).toEqual('DELETE');
  
    req.flush(data);
  
    httpTestingController.verify();
  });
    
  it('recipe service should ADD a specific ingredient to the a specific ID Recipe', () => {
    const id : number = 1;
    const apiSuffix : string = "add-ingredient"; 
    const data : Data = {id:1, name: 'Testing Data 1'}

    service.addIngredientToRecipe(id, data)
      .subscribe(_data =>{
        console.log("_data" + JSON.stringify(_data));
        expect(_data).toEqual(data);
        }
      );
  
    const req = httpTestingController.expectOne(`${url}/${id}/${apiSuffix}`);
    
    expect(req.request.method).toEqual('POST');
  
    req.flush(data);
  
    httpTestingController.verify();
  });
       
  it('recipe service should REMOVE a specific data to the a specific ID Recipe', () => {
    const id : number = 1;
    const apiSuffix : string = "remove-ingredient";
    const data : Data = {id:1, name: 'Testing Data 1'}

    service.removeIngredientFromRecipe(id, data)
      .subscribe(_data =>{
        console.log("_data" + JSON.stringify(_data));
        expect(_data).toEqual(data);
        }
      );
  
    const req = httpTestingController.expectOne(`${url}/${id}/${apiSuffix}`);
    
    expect(req.request.method).toEqual('POST');
  
    req.flush(data);
  
    httpTestingController.verify();
  });

});
