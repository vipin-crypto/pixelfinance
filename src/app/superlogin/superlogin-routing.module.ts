import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperloginComponent } from './superlogin.component';


const routes: Routes = [{path: '', component: SuperloginComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperLoginRoutingModule { 


    
}
