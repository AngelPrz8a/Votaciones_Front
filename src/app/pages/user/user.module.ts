import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { NbButtonModule, NbCardModule, NbInputModule, NbSelectModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
import {IndexComponent} from './index/index.component'

@NgModule({
  declarations: [
    CreateComponent,
    IndexComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    //------------------
    NbCardModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
  ]
})
export class UserModule { }