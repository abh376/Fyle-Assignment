import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,FormControl,Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router,RouterEvent,RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {USER} from '../user';
import {UserService} from '../user.service'
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [RouterLink,RouterModule,RouterOutlet,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit{
  isSubmitted: boolean=false;
  userform:FormGroup;
  newuser: USER={
    id:1,
    name:'',
    arr:[]
  }
    constructor(private fb:FormBuilder,private uservice:UserService,private router:Router){
      
    }
    ngOnInit(): void {
      this.userform=this.fb.group({
        name:['',Validators.required],
        itemRows: this.fb.array(
          [this.initItemRows()]
        )
      });
    }
    get f(): { [key: string]: AbstractControl } {
      return this.userform.controls;
    }
    initItemRows(){
      return this.fb.group({
        course:['',Validators.required],
        noOfWorkMin:null,
      });
    }
    get getItemRow(){
      return (this.userform.controls.itemRows as FormArray).controls;
    }
    addNewRow(){
      const control=<FormArray>this.userform.controls['itemRows'];
      control.push(this.initItemRows());
    }
    deleteRow(index:number){
      const control=<FormArray>this.userform.controls['itemRows'];
      control.removeAt(index);
  }
  public addItem(): void{
        this.isSubmitted=true;
        this.newuser={
          id:0,
          name:this.userform.value.name,
          arr:this.userform.value.itemRows
  }
         this.uservice.create(this.newuser);
         for(let i=1;i<=this.userform.value.itemRows.length;i++)
         {
          const control=<FormArray>this.userform.controls['itemRows'];
      control.removeAt(1);
         }
        this.userform.reset();
        this.newuser={
          id:0,
          name:'',
          arr:[]
        }
   }
   reset(){
    this.isSubmitted=false;
    this.userform.reset();
    for(let i=1;i<=this.userform.value.itemRows.length;i++)
      {
        const control=<FormArray>this.userform.controls['itemRows'];
        control.removeAt(1);
       }
   }
   goBack(){
    this.router.navigate(['']);
  }
}
