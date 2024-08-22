import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CreateComponent } from '../create/create.component'; 
import { ShowchartComponent } from './showchart.component';
import { UserService } from '../user.service';
import { USER } from '../user';

describe('ShowchartComponent', () => {
  let component: ShowchartComponent;
  let fixture: ComponentFixture<ShowchartComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowchartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get call getall',()=>{
    const userservice=TestBed.inject(UserService);
    const spy=spyOn(userservice,'getAll');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
  it('should push',fakeAsync(() => {
    const userservice=TestBed.inject(UserService);
    const newuser: USER={
      id:1,
      name:'',
      arr:[]
    }
    userservice.create(newuser);
    fixture.detectChanges();
    const ss=spyOn(component,'pushit').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('#push');
    button.click();
    tick();
    expect(ss).toHaveBeenCalled();
    fixture.detectChanges();    
  }));
   it('should call select function',()=>{
    const ss=spyOn(component,'onSelect').and.callThrough();
    let event: any;
    component.onSelect(event);
    expect(ss).toHaveBeenCalled();

   })
});
