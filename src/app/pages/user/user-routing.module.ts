import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from './index/index.component'
import { CreateComponent } from './create/create.component';


const routes: Routes = [
  {
    path:"index",
    component:IndexComponent,
  },
  {
    path:"create",
    component:CreateComponent,
  },
  {
    path:"update/:_id",
    component:CreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
