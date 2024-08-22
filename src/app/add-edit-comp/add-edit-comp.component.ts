import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule,Validators,FormArray,FormGroup,FormBuilder } from '@angular/forms';
import {  ActivatedRoute, RouterModule } from '@angular/router';
import {UserService} from '../user.service';
import { USER } from '../user';
import {NgxPaginationModule} from 'ngx-pagination';
import { searchNamepipe} from '../searach-name.pipe';
import {searchcoursepipe} from '../search-course.pipe';
@Component({
  selector: 'app-add-edit-comp',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule,searchcoursepipe,searchNamepipe,ReactiveFormsModule,FormsModule,RouterModule],
  templateUrl: './add-edit-comp.component.html',
  styleUrl: './add-edit-comp.component.scss'
})
export class AddEditCompComponent implements OnInit{
  p:number;
  ite:string;
  name:string;
  compWindow: any;
  course:string[]=['Running','Cycling','yoga','swimming'];

  constructor(private uservice:UserService,private activatedRout:ActivatedRoute){
     
  }
  users:USER[]=[];
  ngOnInit(): void {
    this.users=this.uservice.getAll();
    this.p=1;
    this.ite='';
    this.name='';
    this.compWindow=window;
  }
  deleteNote(noteId:number):void{
    if(confirm("Do you want to delete?"))
    {
     this.uservice.delete(noteId);
     this.compWindow.location.reload();
    }
    else
    {
     return;
    }
 }
  Add(element:any)
  {
   let sum=0;
   element.forEach((x:any) => {
     sum=sum+x.noOfWorkMin;
   });
   return sum;
  }  
  Concat(element:any){
    let d=element.map(x=>x.course).join(",").toString();
    return d;
  }
}
