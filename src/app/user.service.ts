import { Injectable, OnInit } from '@angular/core';
import {USER} from './user';
@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {
  private localStorageKey='user';
  constructor() { 
    
  }
  ngOnInit(): void {
    
  }
  getAll():USER[]{  
      
    const notesJson = localStorage.getItem(this.localStorageKey);
    return notesJson ? JSON.parse(notesJson) :  [];
  }
  //get(id:number) :USER |any{
  //  const notesJson = localStorage.getItem(this.localStorageKey);
  //  const notes: USER[] = notesJson ? JSON.parse(notesJson):[];
  //  console.log(id);
  //  console.log(notes);
  //  console.log(notes.find((n)=>n.id==id));
  //  return notes.find((n)=>n.id==id);
  //}
  create(note:USER) :USER{
    let notes:USER[]=JSON.parse(localStorage.getItem(this.localStorageKey)||'[]')
    note.id=this.generateId();
    notes.push(note);
    localStorage.setItem(this.localStorageKey,JSON.stringify(notes));
    return note;
  }
  //update(note:Note) :Note | undefined{
   // let notes:Note[]=JSON.parse(localStorage.getItem(this.localStorageKey)||'[]')
   // const index = notes.findIndex(n=>n.id===note.id);
   // if(index !=-1){
   //   console.log('user');
    //  notes[index]=note;
   //   localStorage.setItem(this.localStorageKey,JSON.stringify(notes));
   //   return note;
  //}
  //return undefined}
  delete(id:number):void{
    let notes:USER[]=JSON.parse(localStorage.getItem(this.localStorageKey)|| '[]');
    const index = notes.findIndex(n=>n.id===id);
    if(index!=-1){
      notes.splice(index,1);
      localStorage.setItem(this.localStorageKey,JSON.stringify(notes));
      
    }
  }
  private generateId():number{
    const notes:USER[]=JSON.parse(localStorage.getItem(this.localStorageKey)||'[]');
    const ids = notes.map(note=>note.id);
    const maxId= Math.max(...ids);
    return maxId >=1 ? maxId+1:1;
  }
}

function load() {
throw new Error('Function not implemented.');
}

