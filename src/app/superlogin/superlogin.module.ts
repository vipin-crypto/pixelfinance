import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuperloginComponent } from './superlogin.component';
import { SuperLoginRoutingModule } from './superlogin-routing.module';
import { RouterModule } from '@angular/router';
@NgModule({
   declarations: [
        SuperloginComponent,
    ],
   imports:[
       CommonModule,
       FormsModule,
       SuperLoginRoutingModule,
       
   ]
})

export class SuperloginModule
{
    
}