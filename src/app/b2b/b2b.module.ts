import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { B2bRoutingModule } from './b2b-routing.module';
import { B2bComponent } from './b2b.component'
import { FormsModule } from '@angular/forms';
import {  PaginationModule, TabsModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    B2bComponent,
  ],
 

  exports: [
  ],
  imports: [
    CommonModule,
    B2bRoutingModule,
    FormsModule,
    PaginationModule.forRoot(),

  ]
})
export class B2bModule { }
