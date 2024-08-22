import { Pipe,PipeTransform } from "@angular/core";
@Pipe({
    name:'searchCourse',
    standalone:true
})
export class searchcoursepipe implements PipeTransform{
   transform(items: any,searchCourse: string): any{
       if(!items) return [];
       if(!searchCourse) return items;
       searchCourse=searchCourse.toLowerCase();
       let p=[];
       let a=0;
       items.forEach((x:any) => {
        a=0;
        x.arr.forEach((y:any) => {
            if(y.course.toLowerCase()==searchCourse)
                a=1;
        });
        if(a==1)
            p.push(x);
       });
       return p; 
   }
}