import { ComponentFixture, TestBed,fakeAsync, tick } from '@angular/core/testing';
import { CreateComponent } from './create.component';
import { COMPOSITION_BUFFER_MODE, FormBuilder, FormsModule, ReactiveFormsModule, SelectMultipleControlValueAccessor, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { createComponent, CUSTOM_ELEMENTS_SCHEMA, Inject, inject } from '@angular/core';
describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  const formbuilder:FormBuilder=new FormBuilder();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas:[CUSTOM_ELEMENTS_SCHEMA],
      imports: [CreateComponent,FormsModule,ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check formgroup',()=>{
    const l=component.userform;
     const y={
      name:'',
    itemRows: [({
      course: '',
      noOfWorkMin:0
    })]
     }
    expect(l.value).toEqual(y); 
  })
  it('should add new row', fakeAsync(() => {
    spyOn(component,'addNewRow').and.callThrough();
    let button = fixture.debugElement.nativeElement.querySelector('#ANR');
    button.click();
    tick();
    fixture.detectChanges();
    expect(component.addNewRow).toHaveBeenCalled();
  }));
  it('should reset', fakeAsync(() => {
    const ss=spyOn(component,'reset').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('#Reset');
    button.click();
    tick();
    expect(ss).toHaveBeenCalled();
    fixture.detectChanges();    
  }));
  it('should reset', fakeAsync(() => {
    const ss=spyOn(component,'goBack').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('#goBack');
    button.click();
    tick();
    expect(ss).toHaveBeenCalled();
    fixture.detectChanges();    
  }));
  it('should add', fakeAsync(() => {
    const ss=spyOn(component,'addItem').and.callThrough();
    const userservice=TestBed.inject(UserService);
    const spy=spyOn(userservice,'create');
    const button = fixture.debugElement.nativeElement.querySelector('#AddItem');
    button.click();
    tick();
    expect(spy).toHaveBeenCalled();
    expect(ss).toHaveBeenCalled();
    fixture.detectChanges();    
  }));
  it('should check delete row',fakeAsync(()=>{
      component.addNewRow();
      component.addNewRow();
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('#DRw')).toBeTruthy();
      const ss=spyOn(component,'deleteRow').and.callThrough();
      const button = fixture.debugElement.nativeElement.querySelector('#DRw');
      button.click();
      tick();
      expect(ss).toHaveBeenCalled();
      fixture.detectChanges();   
  }))
  it('should call functions',()=>{
    const ss=spyOn(component,'initItemRows').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(ss).toHaveBeenCalled();
  })  
});
