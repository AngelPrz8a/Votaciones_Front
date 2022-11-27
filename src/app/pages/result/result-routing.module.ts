import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';
import { CComponent } from './c/c.component';
import { CreateComponent } from './create/create.component';
import { DComponent } from './d/d.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path:"index",
    component:IndexComponent
  },
  {
    path:"create",
    component:CreateComponent
  },
  {
    path:"update/:_id",
    component:CreateComponent
  },
  {
    path:"a",
    component:AComponent
  },
  {
    path:"b",
    component:BComponent
  },
  {
    path:"c",
    component:CComponent
  },
  {
    path:"d",
    component:DComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultRoutingModule { }
