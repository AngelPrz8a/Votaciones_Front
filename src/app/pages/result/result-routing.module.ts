import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';
import { CComponent } from './c/c.component';
import { DComponent } from './d/d.component';

const routes: Routes = [
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
