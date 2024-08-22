import { Routes } from '@angular/router';
import { AddEditCompComponent } from './add-edit-comp/add-edit-comp.component';
import { CreateComponent } from './create/create.component';
import { ShowchartComponent } from './showchart/showchart.component';
export const routes: Routes = [
    {path:'' , component:AddEditCompComponent},
    {path:'create',component:CreateComponent},
    {path:'show',component:ShowchartComponent}
];
