import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import { AddEditCompComponent } from './add-edit-comp.component';
import { UserService } from '../user.service';
import { USER } from '../user';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
describe('AddEditCompComponent', () => {
  let component: AddEditCompComponent;
  let fixture: ComponentFixture<AddEditCompComponent>;
  const myWindow = {
    location: {
      reload() { return 'something'; }
    }
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCompComponent,RouterModule.forRoot([])]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AddEditCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add',()=>{
    let arr=[{
      course: 'Cycling',
    noOfWorkMin: 124
  },{
    course: 'Running',
    noOfWorkMin: 130
  }];
    let ans=component.Add(arr);
    expect(ans).toEqual(254);
  })
  it('should concat',()=>{
    let arr=[{
      course: 'Cycling',
    noOfWorkMin: 124
  },{
    course: 'Running',
    noOfWorkMin: 130
  }];
    let ans=component.Concat(arr);
    expect(ans).toEqual('Cycling,Running');
  })
  it('should delete',fakeAsync(() => {
    const userservice=TestBed.inject(UserService);
    const newuser: USER={
      id:1,
      name:'',
      arr:[]
    }
    userservice.create(newuser);
    fixture.detectChanges();
    const ss=spyOn(component,'deleteNote').and.callThrough();
    component.compWindow=myWindow;
    spyOn(window,'confirm').and.  returnValue(false);
    const button = fixture.debugElement.nativeElement.querySelector('#deletei');
    button.click();
    tick();
    expect(ss).toHaveBeenCalled();
    fixture.detectChanges();
  }));
  it('should get call getall',()=>{
    const userservice=TestBed.inject(UserService);
    const spy=spyOn(userservice,'getAll');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  it('should traverse',()=>{
    const element: DebugElement[]=fixture.debugElement.queryAll(By.css('#tr'));
    expect(element.length).toEqual(4);}
);
it('should select a value',()=>{
const select: HTMLSelectElement=fixture.debugElement.query(By.css('#dropdown')).nativeElement;
select.value=select.options[3].value;
select.dispatchEvent(new Event('change'));
fixture.detectChanges();
expect(select.value).toEqual('3: yoga');
});
});
