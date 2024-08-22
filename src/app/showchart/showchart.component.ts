import { Component, OnInit } from '@angular/core';
import {USER} from '../user';
import {UserService} from '../user.service';
import {ScaleType,NgxChartsModule} from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-showchart',
  standalone: true,
  imports: [CommonModule,NgxChartsModule],
  templateUrl: './showchart.component.html',
  styleUrl: './showchart.component.scss'
})
export class ShowchartComponent implements OnInit{
  width: number = 700;
  height: number = 300;
  fitContainer: boolean = false;
   products: any;
  view: [number,number]= [400,600];
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'workout_type';
  showYAxisLabel = true;
  yAxisLabel = 'NOofMins';
  timeline = true;
  doughnut = true;
  colorScheme = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };
  users:USER[]=[];
  gele:any;
constructor(private uservice:UserService){}
ngOnInit(): void {
  this.users=this.uservice.getAll();
  this.products=[];
  this.gele=[];
}
pushit(element:any)
 {
   this.products=[];
  this.users.forEach((value,index,array)=>{
    if(value==element)
     {
        this.gele=element.arr;
     }       
   })
   this.gele.forEach((x:any) => {
    this.products.push({
      "name":x.course,
      "value":x.noOfWorkMin})
    });
   console.log(JSON.stringify(this.products));
 }
 onSelect(event) {
  console.log(event);
}
}
