import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { IndexComponent } from './index/index.component';
import { NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    //------------------
    NbCardModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
  ]
})
export class TableModule { }
