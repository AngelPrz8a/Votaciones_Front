import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';
import { CComponent } from './c/c.component';
import { DComponent } from './d/d.component';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AComponent,
    BComponent,
    CComponent,
    DComponent
  ],
  imports: [
    CommonModule,
    ResultRoutingModule,
    //------------------
    NbCardModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
  ]
})
export class ResultModule { }
