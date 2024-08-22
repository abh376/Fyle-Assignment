import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { USER } from './user';
import { inject } from '@angular/core';
import { HttpClientJsonpModule } from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
  });
  beforeEach(()=>{
    let store={};
    const mocklocalstorage={
      getItem: (key:string):
      string=>{
        return key in store?
        store[key]:null;
      },
      setItem: (key: string,value:string)=>{
        store[key]=`${value}`;
      },
      removeItem: (key:string)=>{
        delete store[key];
      },
      clear: ()=>{
        store={};
      }
    };
    spyOn(localStorage,'getItem').and.callFake(mocklocalstorage.getItem);
    spyOn(localStorage,'setItem').and.callFake(mocklocalstorage.setItem);
    spyOn(localStorage,'removeItem').and.callFake(mocklocalstorage.removeItem);
    spyOn(localStorage,'clear').and.callFake(mocklocalstorage.clear);
  })
  it('should be created',() => {
    expect(service).toBeTruthy();
  });
  it('should delete in the localstorage',()=>{
    const string:USER ={
      id: 1,
      name: 'Fyle Assignment',
      arr: []
    }
    service.create(string);
    service.delete(1);
    expect(localStorage.getItem('user')).toEqual(JSON.stringify([]));
  })
  it('should create a post',()=>{
    const string:USER ={
      id: 0,
      name: 'Fyle Assignment',
      arr: []
    }
    service.create(string);
    expect(localStorage.getItem('user')).toEqual(JSON.stringify([string]));
  })
});
