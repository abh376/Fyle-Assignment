import { Pipe,PipeTransform } from "@angular/core";
@Pipe({
    name:'searchName',
    standalone:true
})
export class searchNamepipe implements PipeTransform{
   transform(items: any,searchName: string): any{
       if(!items) return [];
       if(!searchName) return items;
       searchName=searchName.toLowerCase();
       return items.filter(item=>(item.name.toLowerCase().includes(searchName)));
   }
}